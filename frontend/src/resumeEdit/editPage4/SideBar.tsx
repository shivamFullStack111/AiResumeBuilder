import React from "react";

interface SideBarProps {
  hiddenSideBar?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ hiddenSideBar }) => {
  return (
    <div
      className={`w-[110px] bg-pink-400 h-full overflow-y-scroll flex flex-col items-center ${
        hiddenSideBar && "hidden"
      }`}
    >
      <img
        src="/logo.png"
        className="mt-6 h-14 w-14 rounded-full  bg-white p-[1px] "
        alt=""
      />
    </div>
  );
};

export default SideBar;
