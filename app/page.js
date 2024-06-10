import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/components/ui/selfmade/Navbar";
import ClientButton from "@/components/clientbutton";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <>
      <Navbar />
      Access Granted
      <ClientButton/>
      </>
      
    )
  }
  else{
    redirect('/login')
  }
}
