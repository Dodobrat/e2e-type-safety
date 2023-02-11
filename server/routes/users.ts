import { z } from "zod";
import { trpc } from "../trpc";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const usersRoutes = trpc.router({
  getUsers: trpc.procedure.query(async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  }),
  getUserById: trpc.procedure
    .input(
      z.object({
        userId: z.number().min(1).max(10),
      })
    )
    .query(async (req) => {
      const uid = req.input.userId;
      const res = await fetch(`${BASE_URL}/users/${uid}`);
      return res.json();
    }),
  createUser: trpc.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async (req) => {
      const res = await fetch(`${BASE_URL}/users`, {
        body: JSON.stringify(req.input),
        method: "POST",
      });

      console.log(req.input);
      return res.json();
    }),
});
