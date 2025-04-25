import { ContractorEmailSent } from '@/models'
import { Firestore } from 'firebase-admin/firestore'

export class ContractorEmailsSentRepository {
  constructor(private firestore: Firestore) {}

  private FB_CONTRACTORS_COLLECTION: string = 'contractors'
  private FB_CONTRACTOR_EMAILS_SENT_SUBCOLLECTION: string = 'emailsSent'

  async create(
    contractorId: string,
    contractorEmailSent: Omit<ContractorEmailSent, 'id'>,
  ) {
    const contractorEmailSentRef = this.firestore
      .collection(this.FB_CONTRACTORS_COLLECTION)
      .doc(contractorId)
      .collection(this.FB_CONTRACTOR_EMAILS_SENT_SUBCOLLECTION)

    const response = await contractorEmailSentRef.add({
      email: contractorEmailSent.email,
      emailType: contractorEmailSent.emailType,
      sentAt: contractorEmailSent.sentAt ?? new Date().toISOString(),
    })

    return response.id
  }
}
