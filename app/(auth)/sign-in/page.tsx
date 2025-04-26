"use client";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useContext } from "react";

function SignIn() {
  const CreateUser = useMutation(api.users.CreateUser);
  const {user, setUser} = useContext(AuthContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);
      const result = await CreateUser({
        email: user.email,
        name: user.name,
        picture: user.picture,
      });
      setUser(result);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-5 border rounded-2xl p-10 shadow-2xl">
        <Image src="/logo.svg" alt="Hero Image" width={50} height={50} />
        <h1 className="text-2xl">Sign In to Personal Assistant AI</h1>
        <Button onClick={() => googleLogin()}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default SignIn;
