import { db } from '@/db'
import { ContractorsRespository } from '@/respositories/contractors-respository'

import { FetchContractorsService } from '../fetch-contractors'

export function makeFetchContractors() {
  const contractorsRespository = new ContractorsRespository(db)
  const fetchContractorsService = new FetchContractorsService(
    contractorsRespository,
  )

  return fetchContractorsService
}
