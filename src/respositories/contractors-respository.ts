import { Contractor } from "@/models/contractor";
import { Firestore } from "firebase-admin/firestore";

export class ContractorsRespository {
  constructor(private firestore: Firestore) {}
  private FB_CONTRACTORS_COLLECTION: string = "contractors";

  async findMany(): Promise<Contractor[]> {
    const response = await this.firestore
      .collection(this.FB_CONTRACTORS_COLLECTION)
      .orderBy("joinDate", "desc")
      .get();

    const contractors = response.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<Contractor, "id">),
      };
    });

    return contractors;
  }
}
