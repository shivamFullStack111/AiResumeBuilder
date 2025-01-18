import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  className?: string | undefined;
  containerClassName?: string | undefined;
}

const Loader: React.FC<Props> = ({ className, containerClassName }) => {
  return (
    <div className={`w-full flex justify-center ${containerClassName} `}>
      <AiOutlineLoading3Quarters
        className={`text-pink-400 animate-spin text-3xl ${className}`}
      />
    </div>
  );
};

export default Loader;
