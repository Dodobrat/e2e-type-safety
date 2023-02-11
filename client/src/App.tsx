import { useState } from "react";
import { trpc } from "./trpc";

export function GetAll() {
  const users = trpc.getUsers.useQuery();

  if (users.isInitialLoading) return <>Loading...</>;
  if (users.isFetching) return <>Fetching...</>;
  if (!users.isFetching && !users.data) return <>No data</>;

  return (
    <pre id='all-users' title='Get all users'>
      {JSON.stringify(users.data, null, 2)}
    </pre>
  );
}

export function GetById() {
  const [userId, setUserId] = useState(1);

  const enableQuery = Boolean(userId) && userId > 0 && userId < 11;

  const user = trpc.getUserById.useQuery({ userId }, { enabled: enableQuery });

  const isLoading = user.isFetching || user.isInitialLoading;
  const isEmpty = !user.isFetching && !user.data;

  return (
    <div>
      <input type='number' min='1' max='10' value={userId || ""} onChange={(e) => setUserId(parseFloat(e.target.value))} />
      {isEmpty && <>No data</>}
      {isLoading ? (
        <>Loading...</>
      ) : (
        <pre id='user-by-id' title='Get user by id'>
          {JSON.stringify(user.data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export function CreateUser() {
  const user = trpc.createUser.useMutation();

  const [name, setName] = useState("");

  if (user.isLoading) return <>Creating...</>;

  return (
    <div id='create' title='Create user'>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => user.mutate({ name })}>Create</button>
      <pre>{JSON.stringify(user.data, null, 2)}</pre>
    </div>
  );
}
