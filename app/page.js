import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/components/ui/selfmade/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar />
      <div>{session ? <h1>Logged in</h1> : <h1>Not logged in</h1>}</div>
      <div>{JSON.stringify(session)}</div>
      This is the Home Page
    </>
  );
}
