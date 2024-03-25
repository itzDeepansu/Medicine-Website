import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>{session ? <h1>Logged in</h1> : <h1>Not logged in</h1>}</div>
      <div>{JSON.stringify(session)}</div>
    </>
  );
}
