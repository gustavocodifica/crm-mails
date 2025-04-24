import { app } from "@/lib/firebase";
import { Firestore } from "firebase-admin/firestore";

const db: Firestore = app.firestore();

export { db };
