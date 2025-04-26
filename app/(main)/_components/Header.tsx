import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Image src="/logo.svg" alt="Hero Image" width={50} height={50} />
      <Image src={user?.picture} alt="Hero Image" width={50} height={50} />
    </div>
  );
}

export default Header;
