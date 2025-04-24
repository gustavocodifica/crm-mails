import { Contractor } from "@/models/contractor";
import { ContractorsRespository } from "@/respositories/contractors-respository";

interface FetchContractorsServiceResponse {
  contractors: Contractor[];
}

export class FetchContractorsService {
  constructor(private contractorsRepository: ContractorsRespository) {}

  async execute(): Promise<FetchContractorsServiceResponse> {
    const contractors = await this.contractorsRepository.findMany();

    return { contractors };
  }
}
