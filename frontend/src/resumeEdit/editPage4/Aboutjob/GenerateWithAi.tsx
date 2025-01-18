import React, { useState } from "react";
import { GrMagic } from "react-icons/gr";
import { ResumeType } from "../../editPage1/WorkExperience";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "../../../store/utils";
import { useSearchParams } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";

interface AiComponentProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  AiInput: string;
  resume: ResumeType | null;
  responsibilities: string;
  setresponsibilities: (value: string) => void;
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GenerateWithAi: React.FC<AiComponentProps> = (props) => {
  const [aiGeneratedValue, setaiGeneratedValue] = useState<string>();
  const [searchParam] = useSearchParams();
  const [isLoading, setisLoading] = useState<boolean>(false);

  let experienceNumber: number = Number(searchParam.get("experience")) - 1 || 0;
  if (experienceNumber == -1) experienceNumber = 0;

  const generateContent = async () => {
    if (!props?.resume) return;
    if (props.resume.workExperience?.length) {
      const workExperience = props?.resume?.workExperience[experienceNumber];

      setisLoading(true);
      const prompt = `give me a paragraph between 50 to 70 words according this ${props?.AiInput} prompt this is for resume user details = job title:${workExperience?.jobTitle}, company name:${workExperience?.companyName} give me full result there no need to edit `;
      const result = await model.generateContent(prompt);
      const str: string = result.response.text();

      setaiGeneratedValue(str);
      console.log(str);
      setisLoading(false);
    }
  };

  return (
    <>
      <p className="text-sm font-semibold mt-5 text-gray-700">
        Briefly describe an achievement or project you worked on, and we’ll turn
        it into an impactful job bullet.
      </p>
      <div>
        <textarea
          value={props?.AiInput}
          onChange={props?.onChange}
          rows={5}
          className={`w-full p-2 outline-none border border-gray-400 rounded-lg mt-2`}
          placeholder="I do frontend and backend both using MERN stack"
        ></textarea>
        <div
          onClick={() => {
            if (props.AiInput.length) {
              generateContent();
            }
          }}
          className={`ml-auto cursor-pointer ${
            props.AiInput.length && "bg-gradient-to-r hover:text-gray-200"
          } from-pink-400 via-pink-400 to-violet-400 items-center w-[160px] bg-gray-300 p-1 px-5 rounded-full flex gap-2 text-[12px] font-bold text-gray-700`}
        >
          <p>{isLoading ? "Generating..." : "Generate with AI"}</p>{" "}
          {!isLoading && <GrMagic />}
        </div>
        {aiGeneratedValue && (
          <div
            onClick={() => {
              props?.setresponsibilities(
                props.responsibilities + "  " + aiGeneratedValue + " "
              );
              setaiGeneratedValue("");
            }}
            className="p-2 cursor-pointer hover:bg-gray-200 mt-2 flex gap-5 items-center text-sm border rounded-lg border-gray-400"
          >
            <div className="p-1 rounded-full text-white bg-pink-400">
              <IoAddSharp className="text-lg" />
            </div>
            <p className="text-gray-700 text-[13px]">{aiGeneratedValue}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateWithAi;
