import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { ResumeType, UPDATE_RESUME } from "../editPage1/WorkExperience";
import { GEMINI_KEY } from "../../store/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import TemplateProvider from "../../TemplateProvider";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Props {
  resume: ResumeType | null;
}

const SkillsDetails: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [aiGeneratedContent, setaiGeneratedContent] = useState<string[]>([]);
  const [inputKeyword, setinputKeyword] = useState<string>("");
  const [selectedSkills, setselectedSkills] = useState<string[]>([]);
  const [updateResumeInBackend, { error }] = useLazyQuery(UPDATE_RESUME);
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    updateResumeInBackend({
      variables: {
        resumeData: {
          skills: selectedSkills,
          currentPath: window?.location?.href,
        },
        resumeid: props?.resume?._id,
      },
    });

    dispatch(
      updateResume({
        skills: selectedSkills,
        currentPath: window?.location?.href,
      })
    );

    if (!error)
      navigate(
        `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=summary-details`
      );
  };

  // for ai generated skills
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!props?.resume) return;
      if (props.resume.workExperience?.length) {
        setisLoading(true);

        const prompt = `give me skills according this text give me 20 suggested skills text=:${
          inputKeyword || props?.resume?.workExperience[0].jobTitle
        } . Return the skills as a comma-separated list. strictly only return list not example or any other text not like (aws)`;

        const result = await model.generateContent(prompt);
        const str: string = result.response.text();

        setaiGeneratedContent(str.split(","));
        setisLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.resume, inputKeyword]);

  // for set skills
  useEffect(() => {
    if (props?.resume?.skills?.length) {
      setselectedSkills(props.resume.skills);
    }
  }, [props?.resume?.skills]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5 gap-5  grid-cols-6 ">
          <div className="col-span-4 w-full    h-full ">
            <h3 className="mt-16 font-bold text-3xl text-slate-800">
              We recommend including 6-8 skills{" "}
            </h3>
            <p className="mt-2 mb-6">
              Choose skills that align with the job requirements. Show employers
              you're confident of the work you do!
            </p>
            <div className="grid-cols-2 grid gap-6">
              <div className="border p-4 border-gray-400  rounded-md w-full h-[450px] ">
                <div className="p-2 border items-center group cursor-pointer hover:shadow-lg hover:border-pink-400  border-gray-400 rounded-md w-full flex">
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setinputKeyword(e.target.value)
                    }
                    type="text"
                    className="outline-none w-full"
                    placeholder="Job title, industry, or keyword"
                  />
                  <IoSearchOutline className="text-2xl group-hover:text-pink-400"></IoSearchOutline>
                </div>
                <p className="font-semibold mt-4 text-gray-700 text-sm">
                  Showing 80 results for Web Developer
                </p>
                <div className="w-full flex-wrap max-h-[330px] pb-2   mt-4 gap-3 flex overflow-y-scroll">
                  {isLoading
                    ? "Generating..."
                    : aiGeneratedContent.map((skill: string, i: number) => (
                        <div
                          onClick={() => {
                            setselectedSkills((p) => [...p, skill]);
                            setaiGeneratedContent((p) =>
                              p.filter((item) => item !== skill)
                            );
                          }}
                          key={i}
                          className="flex gap-2 items-center rounded-full h-min px-4 py-[7px] font-semibold text-sm border border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                          {" "}
                          <IoIosAddCircle className="text-pink-400 text-lg"></IoIosAddCircle>
                          <p>{skill.trim()}</p>
                        </div>
                      ))}
                </div>
              </div>
              <div className="border p-4 border-gray-400 overflow-y-hidden rounded-md w-full h-[450px] ">
                <p className=" text-gray-700  font-semibold">
                  You added 80 skills for Web Developer
                </p>

                <div className="w-full flex-wrap max-h-[370px] h-min  pb-2   mt-4 gap-3 flex overflow-y-scroll">
                  {!selectedSkills.length ? (
                    <div className="flex justify-center text-red-500 font-semibold w-full items-center h-[20] text-center">
                      No Skills Added
                    </div>
                  ) : (
                    selectedSkills?.map((skill: string, i: number) => {
                      return (
                        <div
                          onClick={() => {
                            setselectedSkills((p) =>
                              p.filter((sk) => sk !== skill)
                            );
                          }}
                          key={i}
                          className="flex gap-2 items-center rounded-full h-min px-4 py-[7px] font-semibold text-sm border border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                          {" "}
                          <AiFillMinusCircle className="text-red-400 text-lg"></AiFillMinusCircle>
                          <p>{skill}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 pt-8 w-full h-full max-h-screen overflow-y-scroll hide ">
            <TemplateProvider resume={props?.resume} />
          </div>{" "}
        </div>
        <div className="flex mt-4  justify-between">
          <div
            onClick={() => navigate(-1)}
            className="px-16 rounded-3xl hover:bg-gray-200 cursor-pointer border-2 border-black font-semibold py-2"
          >
            Back
          </div>
          <div
            onClick={handleContinue}
            className="px-16 rounded-3xl bg-blue-500  hover:bg-blue-600 cursor-pointer text-white font-semibold py-2"
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsDetails;
