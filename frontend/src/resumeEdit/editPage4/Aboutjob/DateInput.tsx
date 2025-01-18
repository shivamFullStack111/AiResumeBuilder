import { useRef } from "react";

interface DateComponentProps {
  title?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const DateInput: React.FC<DateComponentProps> = (props) => {
  // const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element

  const handleBoxClick = () => {
    inputRef.current?.focus(); // Focus the input element when the box is clicked
  };

  return (
    <div onClick={handleBoxClick}>
      <p className="text-[13px] font-semibold text-gray-700 uppercase">
        {props.title}
      </p>
      <div // Click handler to focus input
        className="w-full flex justify-between p-2 border-2 mt-[1px] outline-none focus:border-pink-400 cursor-pointer rounded-md border-gray-300 shadow-md shadow-white hover:shadow-gray-300"
      >
        <p className="text-gray-400">{props.placeholder}</p>
        <input
          value={
            props?.value?.length == 10
              ? props?.value
              : props?.value
              ? new Date(Number(props.value)).toISOString().split("T")[0]
              : ""
          }
          id="dd"
          ref={inputRef} // Attach ref to the input element
          onChange={props.onChange}
          placeholder="b"
          className=" outline-none h-5"
          type="date"
        />
      </div>
    </div>
  );
};