import React, { useEffect, useState } from "react";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import { ResumeType } from "../../editPage1/WorkExperience";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSearchParams } from "react-router-dom";
import { GEMINI_KEY } from "../../../store/utils";

interface AiGeneratedProps {
  resume: ResumeType | null;
  responsibilities: string;
  setresponsibilities: (value: string) => void;
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AiGenerated: React.FC<AiGeneratedProps> = (props) => {
  const [searchParam] = useSearchParams();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [aiGeneratedValue, setaiGeneratedValue] = useState<string[]>([]);
  const [keywords, setkeywords] = useState("");

  let experienceNumber: number = Number(searchParam.get("experience")) - 1 || 0;
  if (experienceNumber == -1) experienceNumber = 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!props?.resume) return;
      if (props.resume.workExperience?.length) {
        const workExperience = props?.resume?.workExperience[experienceNumber];

        (async () => {
          setisLoading(true);

          const prompt = `give 10 paragraph each paragraph between 25 to 35  words seprated by --- on i am  ${
            workExperience?.jobTitle
          } on ${workExperience?.companyName} ${
            keywords && `keywords:${keywords}`
          } what i do here?`;

          const result = await model.generateContent(prompt);
          const str: string = result.response.text();
          const paragraphs = str.replace("/n", "").split("---");

          setaiGeneratedValue(paragraphs);
          setisLoading(false);
        })();
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [props?.resume, experienceNumber, keywords]);

  return (
    <>
      <div className="p-2 border items-center mt-5 border-gray-400 rounded-md w-full flex">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setkeywords(e.target.value)
          }
          type="text"
          className="outline-none w-full"
          placeholder="Job title, industry, or keyword"
        />
        <IoSearchOutline className="text-2xl"></IoSearchOutline>
      </div>
      {isLoading ? (
        <div className="text-center mt-5 text-transparent bg-clip-text text-lg font-semibold bg-gradient-to-br from-pink-500 via-pink-400 to-violet-500 ">
          Generating...
        </div>
      ) : (
        <div className="mt-5">
          <p className="font-semibold text-sm">
            Showing ({aiGeneratedValue?.length} results) for{" "}
            {props?.resume?.workExperience?.length &&
              props?.resume?.workExperience[experienceNumber].jobTitle}
          </p>
          <div className="max-h-[400px] p-2 pt-0 overflow-y-scroll scroll-smooth">
            {aiGeneratedValue?.map((para: string, i: number) => {
             

              return (
                <div
                  onClick={() => {
                    props?.setresponsibilities(
                      props.responsibilities + " " + para + " "
                    );

                    setaiGeneratedValue(p=>p.filter(val=>val!==para))
                  }}
                  key={i}
                  className="p-2 cursor-pointer hover:bg-gray-200 mt-2 flex gap-5 items-center text-sm border rounded-lg border-gray-400"
                >
                  <div className="p-1 rounded-full text-white bg-pink-400">
                    <IoAddSharp className="text-lg" />
                  </div>
                  <p className="text-gray-700 text-[13px]">
                    {para}
                  </p>
                </div>
              );
            })}
            {/*
            <div className="p-2 cursor-pointer hover:bg-gray-200 mt-2 flex gap-5 items-center text-sm border rounded-lg border-gray-400">
              <div className="p-1 rounded-full text-white bg-red-400">
                <IoRemove className="text-lg" />
              </div>
              <p className="text-gray-700 text-[13px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti eos accusantium esse neque tenetur nesciunt
              </p>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default AiGenerated;
