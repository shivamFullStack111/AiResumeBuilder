import { SignedIn, UserButton } from "@clerk/clerk-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="w-full py-2 mxn flex items-center bg-[#ffebf5] justify-between ">
      <div className="flex gap-3 items-center font-semibold text-gray-600">
        <img src={'/logo.png'} className="w-12 h-12" alt="" />
        <p className="text-xl">Resumeup</p>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
