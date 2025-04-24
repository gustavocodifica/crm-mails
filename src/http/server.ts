import { env } from "@/env";
import { app } from "./app";

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log(`HTTP server stated on port 3333`));
