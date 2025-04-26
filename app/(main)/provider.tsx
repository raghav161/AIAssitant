'use client';
import React, { use, useEffect } from "react";
import Header from "@/app/(main)/_components/Header";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useRouter } from "next/router";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter(); 
  useEffect(() => {
    CheckUseSAuth();
  }, []);

  const CheckUseSAuth = async () => {
    const token = localStorage.getItem("user_token");
    const user = token && await GetAuthUserData(token);
    if(!user){
      router.replace("/sign-in");
      return;
    }
  }
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
