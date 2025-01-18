import React from "react";
import { SignedOut, SignIn } from "@clerk/clerk-react";

const Login: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignedOut>
        <SignIn path="/sign-in" routing="path" />
      </SignedOut>
    </div>
  );
};

export default Login;
