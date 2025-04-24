import admin from "firebase-admin";

import { env } from "@/env";

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: env.CLIENT_EMAIL,
    privateKey: env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: env.PROJECT_ID,
  }),
});

export { app };
