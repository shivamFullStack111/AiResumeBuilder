import React, { useState } from "react";

interface Props {
  title?: string;
  placeholder?: string;
  containerClassName?: string;
  titleClassName?: string;
  inputClassName?: string;
  autofocus?: boolean;
  value?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}
const CustomInput: React.FC<Props> = ({
  title = "Title",
  placeholder = "placeholder",
  containerClassName,
  titleClassName,
  inputClassName,
  autofocus,
  value,
  onchange,
  type,
  required = false,
}) => {
  const [focus, setfocus] = useState<boolean>(false);

  return (
    <div className={`  ${containerClassName}`}>
      <p
        className={` text-[13px] font-semibold text-gray-700 ${
          focus && "text-pink-400"
        }  ${titleClassName} uppercase`}
      >
        {title}
      </p>
      <input
        required={required}
        onFocus={() => setfocus(true)}
        onBlur={() => setfocus(false)}
        autoFocus={autofocus}
        value={value}
        onChange={onchange}
        className={` w-full p-2 border-2 mt-[1px] outline-none focus:border-pink-400 cursor-pointer rounded-md border-gray-300 shadow-md shadow-white hover:shadow-gray-300 ${inputClassName}`}
        placeholder={placeholder}
        type={type ? type : "text"}
      />
    </div>
  );
};

export default CustomInput;
