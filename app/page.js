"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
     const {user} = useUser();
     const router = useRouter();

     useEffect(() => {
       if (user) {
         router.replace('/dashboard')
       } else {
         router.replace('/sign-up')
       }
     }, [user, router]);

  return (
    <>
      <div>
        Please wait...
      </div>
    </>
  );
}