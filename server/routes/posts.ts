import { z } from "zod";
import { trpc } from "../trpc";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const postsRoutes = trpc.router({
  getPosts: trpc.procedure.query(async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    const data: Awaited<Promise<Post[]>> = await res.json();
    return data;
  }),
  getPostById: trpc.procedure.input(z.object({ postId: z.number().min(1).max(100) })).query(async (req) => {
    const res = await fetch(`${BASE_URL}/posts/${req.input.postId}`);
    const data: Awaited<Promise<Post>> = await res.json();
    return data;
  }),
  createPost: trpc.procedure.input(z.object({ title: z.string() })).mutation(async (req) => {
    const res = await fetch(`${BASE_URL}/posts`, {
      body: JSON.stringify(req.input),
      method: "POST",
    });
    const data: Awaited<Promise<Pick<Post, "id">>> = await res.json();
    return data;
  }),
});
