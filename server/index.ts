import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { usersRoutes } from "./routes/users";
import { trpc } from "./trpc";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const appRouter = trpc.mergeRouters(usersRoutes);

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

export type AppRouter = typeof appRouter;
