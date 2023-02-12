import { useState } from "react";
import { trpc } from "./trpc";

export function GetAll() {
  const posts = trpc.getPosts.useQuery();

  if (posts.isInitialLoading) return <>Loading...</>;
  if (posts.isFetching) return <>Fetching...</>;
  if (!posts.isFetching && !posts.data) return <>No data</>;

  return (
    <div title='Get all Posts'>
      <ul>
        {posts.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export function GetById() {
  const [postId, setPostId] = useState(1);

  const enableQuery = Boolean(postId) && postId > 0 && postId < 101;

  const post = trpc.getPostById.useQuery({ postId }, { enabled: enableQuery });

  const isLoading = post.isFetching || post.isInitialLoading;
  const isEmpty = !post.isFetching && !post.data;

  return (
    <div title='Get Post by id'>
      <input type='number' min='1' max='10' value={postId || ""} onChange={(e) => setPostId(parseFloat(e.target.value))} />
      {isEmpty && <>No data</>}
      {isLoading ? <>Loading...</> : <p>{post.data?.title}</p>}
    </div>
  );
}

export function Create() {
  const post = trpc.createPost.useMutation();

  const [title, setTitle] = useState("");

  if (post.isLoading) return <>Creating...</>;

  return (
    <div title='Create Post'>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => post.mutate({ title })}>Create</button>
      <p>Created a new post with id: {post.data?.id}</p>
    </div>
  );
}
