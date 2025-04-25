import { db } from '@/db'
import { Contractor, ContractorEmailSent } from '@/models'
import { ContractorEmailsSentRepository } from '@/respositories/contractor-emails-sent'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface SendScheduledEmailsServiceRequest {
  requestURL: string
  cursor: string | null
}

interface SendScheduledEmailsServiceResponse {
  message: string
}

export class SendScheduledEmailsService {
  constructor(
    private contractorEmailsSentRepository: ContractorEmailsSentRepository,
  ) {}

  private BATCH_SIZE = 10
  private FB_CONTRACTORS_COLLECTION = 'contractors'

  getEmailType(
    differenceSinceJoinInDays: number,
  ): ContractorEmailSent['emailType'] | null {
    switch (differenceSinceJoinInDays) {
      case 1:
        return 'welcome'

      case 7:
        return 'half_test'

      case 11:
        return 'three_days_before'

      case 14:
        return 'last_day'

      case 17:
        return 'three_days_after'

      default:
        return null
    }
  }

  async execute({
    requestURL,
    cursor,
  }: SendScheduledEmailsServiceRequest): Promise<SendScheduledEmailsServiceResponse> {
    console.log({ cursor })

    let query = db
      .collection(this.FB_CONTRACTORS_COLLECTION)
      .orderBy('joinDate', 'desc')
      .limit(this.BATCH_SIZE)

    if (cursor) {
      const lastDoc = await db
        .collection(this.FB_CONTRACTORS_COLLECTION)
        .doc(cursor)
        .get()

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc)
      }
    }

    const response = await query.get()

    if (response.empty) {
      return {
        message: 'No more contractors to process.',
      }
    }

    const contractors = response.docs.map(doc => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<Contractor, 'id'>),
      }
    })

    let lastDocId = null

    const today = dayjs().utc().endOf('d')

    const mappedContractors = contractors.map(contractor => {
      const differenceSinceJoinInDays = today.diff(contractor.joinDate, 'day')

      lastDocId = contractor.id

      return {
        ...contractor,
        differenceSinceJoinInDays,
        emailType: this.getEmailType(differenceSinceJoinInDays),
      }
    })

    if (mappedContractors.length === this.BATCH_SIZE) {
      const url = new URL('/api/send-emails', requestURL)

      fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cursor: lastDocId,
        }),
      }).catch(error => {
        console.log(error)
      })
    }

    const filteredContractors = mappedContractors.filter(
      contractor => !contractor.subscriptionId && contractor.emailType !== null,
    )

    await Promise.all(
      filteredContractors.map(async contractor =>
        this.contractorEmailsSentRepository.create(contractor.id, {
          email: contractor.email,
          emailType: contractor.emailType!,
        }),
      ),
    )

    return {
      message: 'Batch processed successfully.',
    }
  }
}
