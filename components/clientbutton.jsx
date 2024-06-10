"use client"

import { Button } from "@/components/ui/button";  
import { signOut } from "next-auth/react";  
import {useRouter} from "next/navigation";

export default function ClientButton() { 
    const router = useRouter();
    const signOutHere=() => {
        signOut({redirect:false})  
        router.push("/login")
    }
    return (
        <>  
            <Button onClick= {() => signOutHere()} className="bg-orange-500 h-10 p-1">Log Out</Button>
        </> 
    )
}