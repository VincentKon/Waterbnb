"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import { UserMenu } from "./UserMenu";
import { User } from "@/app/generated/prisma";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import Search from "./Search";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo></Logo>
            <Search></Search>
            <UserMenu currentUser={currentUser!}></UserMenu>
          </div>
        </Container>
      </div>
      <Categories></Categories>
    </div>
  );
};
