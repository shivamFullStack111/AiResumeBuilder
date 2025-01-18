import { SignedIn, SignedOut } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const LoginedProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      {" "}
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to={"/sign-in"} />
      </SignedOut>
    </>
  );
};

export default LoginedProvider;
