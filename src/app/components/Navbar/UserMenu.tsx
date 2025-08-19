"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import MenuItem from "./MenuItem";
import useLogInModal from "@/app/hooks/useLogInModal";
import { User } from "@/app/generated/prisma";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  console.log({ currentUser });
  const router = useRouter();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const logInModal = useLogInModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return logInModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, logInModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Waterbnb your property
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu></AiOutlineMenu>
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}></Avatar>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My Trips"
                ></MenuItem>
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My Favourites"
                ></MenuItem>
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                ></MenuItem>
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                ></MenuItem>
                <MenuItem onClick={rentModal.onOpen} label="My Home"></MenuItem>
                <hr />
                <MenuItem onClick={() => signOut()} label="Sign Out"></MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={logInModal.onOpen}
                  label="Sign In"
                ></MenuItem>
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Sign Up"
                ></MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
