"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-center cursor-pointer rounded-full border border-white hover:border-waterbnb-dark transition"
      onClick={() => router.push("/")}
    >
      <Image
        alt="Logo"
        height={60}
        width={60}
        src={"/images/logo.png"}
        className="-mr-1"
      ></Image>
      <h1 className="text-2xl font-extrabold text-waterbnb hidden lg:block mr-2">
        Waterbnb
      </h1>
    </div>
  );
};

export default Logo;
