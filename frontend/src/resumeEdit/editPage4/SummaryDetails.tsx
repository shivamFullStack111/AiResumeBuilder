import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { GrMagic } from "react-icons/gr";
import { ResumeType } from "../editPage1/WorkExperience";
import { GEMINI_KEY } from "../../store/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLazyQuery } from "@apollo/client";
import { RootState, useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import TemplateProvider from "../../TemplateProvider";
import { UPDATE_RESUME } from "../../utils";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlinePreview } from "react-icons/md";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Props {
  resume: ResumeType | null;
}

const SummaryDetails: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [aiGeneratedSummary, setaiGeneratedSummary] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [inputValue, setinputValue] = useState<string>("");
  const [finalSummary, setfinalSummary] = useState<string>("");
  const [updateResumeInBackend, { error }] = useLazyQuery(UPDATE_RESUME);
  const dispatch = useAppDispatch();
  const [previewOpen, setpreviewOpen] = useState(false);
  const { formating } = useSelector((state: RootState) => state.resume);

  const handleContinue = () => {
    if (!finalSummary)
      return toast.error("Please add a summary that showcase your abilities");
    updateResumeInBackend({
      variables: {
        resumeData: {
          professionalSummary: finalSummary,
          currentPath: window.location.href,
        },
        resumeid: props?.resume?._id,
      },
    });

    if (!error) {
      dispatch(
        updateResume({
          professionalSummary: finalSummary,
          currentPath: window.location.href,
        })
      );
    }
    navigate(
      `?page=4&templateid=${props?.resume?._id}&edit=add-section-details`
    );
  };

  useEffect(() => {
    if (props?.resume?.professionalSummary) {
      setfinalSummary(props?.resume?.professionalSummary);
    }
  }, [props?.resume?.professionalSummary]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (props?.resume?.workExperience) {
        setisLoading(true);
        const prompt = `skills:${props?.resume?.skills?.toString()} previous job title:${
          props?.resume?.workExperience[0]?.jobTitle
        }  responsibilites in preveious job:${
          props?.resume?.workExperience[0]?.responsibilities
        } ${
          inputValue && "keywords:" + inputValue
        } according to this all data give me summary for resume strictly only give me 5 summary seprated by %%% each summary between 60 to 70 words `;

        const result = await model.generateContent(prompt);
        const str: string = result.response.text();
        setaiGeneratedSummary(str.split("%%%"));
        setisLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [props?.resume?.skills, props?.resume?.workExperience, inputValue]);

  const enhanceValue = async () => {
    const prompt = `enhance ${finalSummary} this is summary for resume so strictly only return me enhance version`;
    const result = await model.generateContent(prompt);
    setfinalSummary(result.response.text());
  };

  return (
    <div className="w-full flex justify-center">
      <Toaster />
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5 gap-5  grid-cols-6 ">
          <div className="col-span-6 1200px:col-span-4 w-full    h-full ">
            <h3 className="mt-6 600px:mt-10 1200px:mt-16 font-bold text-xl 600px:text-2xl 1200px:text-3xl text-slate-800">
              We recommend including 6-8 skills{" "}
            </h3>
            <p className="mt-2 text-sm 600px:text-lg 1200px:text-xl">
              Choose skills that align with the job requirements. Show employers
              you're confident of the work you do!{" "}
            </p>

            <div>
              <MdOutlinePreview
                onClick={() => setpreviewOpen(true)}
                className="text-[40px] p-2 mt-4 bg-green-500 text-white rounded-md ml-auto  1200px:hidden"
              ></MdOutlinePreview>
            </div>
            

            <h3 className="mt-6 600px:mt-10 1200px:mt-16 font-bold text-xl 600px:text-2xl 1200px:text-3xl text-slate-800"></h3>
            <p className="mt-2 text-sm 600px:text-lg 1200px:text-xl">
              Choose skills that align with the job requirements. Show employers
              you're confident of the work you do!{" "}
            </p>
            <div className="grid-cols-1 800px:grid-cols-2 grid gap-6">
              <div className="border p-4 border-gray-400  rounded-md w-full h-[450px] ">
                <p className="font-semibold text-[12px] text-gray-600">
                  SEARCH BY JOB TITLE
                </p>
                <div className="p-2 border items-center group cursor-pointer hover:shadow-lg hover:border-pink-400  border-gray-400 rounded-md w-full flex">
                  <input
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setinputValue(e.target.value)
                    }
                    type="text"
                    className="outline-none w-full"
                    placeholder="Job title, industry, or keyword"
                  />
                  <IoSearchOutline className="text-2xl group-hover:text-pink-400"></IoSearchOutline>
                </div>
                <p className="font-semibold mt-4 text-gray-700 text-sm">
                  Showing Results for web{" "}
                </p>
                {isLoading && (
                  <p className="mt-4 font-semibold"> Generating...</p>
                )}
                <div className="w-full  flex-col  h-full max-h-[310px] mt-4 gap-3 flex overflow-y-scroll">
                  {aiGeneratedSummary?.map((summary: string, i: number) => (
                    <div
                      onClick={() =>
                        setfinalSummary(
                          (p) =>
                            p + `${finalSummary ? "\n" : ""}` + summary.trim()
                        )
                      }
                      key={i}
                      className="flex gap-2 items-center rounded-md h-min text-sm font-normal px-2 py-[7px]   text-gray-600 border border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                      {" "}
                      <IoIosAddCircle className="text-pink-400  min-w-6 text-[70px]"></IoIosAddCircle>
                      <p>{summary}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border p-4 border-gray-400 overflow-y-hidden rounded-md w-full h-[450px] ">
                <AiComponent
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setfinalSummary(e.target.value)
                  }
                  setfinalSummary={setfinalSummary}
                  enhanceValue={enhanceValue}
                  finalSummary={finalSummary}
                />

                <div className="mt-4 ">
                  <p className="text-lg font-semibold text-gray-700">
                    Things to know
                  </p>
                  <ul className="text-[12px] list-disc pl-5 space-y-1 text-gray-600 mt-1">
                    <li>Match keywords to a job description</li>
                    <li>Highlight your top skills and experience</li>
                    <li>Keep it short, up to 3 sentences</li>{" "}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {previewOpen && (
            <div
              onClick={() => setpreviewOpen(false)}
              className="absolute 1200px:hidden h-full w-full bg-[#00000044] top-0 left-0 flex justify-center items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[430px] px-4"
              >
                <TemplateProvider formating={formating} resume={props?.resume} />
              </div>
            </div>
          )}
          <div className="col-span-2 max-1200px:hidden pt-8 w-full h-full max-h-screen 1200px:overflow-y-scroll hide ">
            <TemplateProvider formating={formating} resume={props?.resume} />
          </div>
        </div>

        <div className="flex mt-10  justify-between">
          <div
            onClick={() => navigate(-1)}
            className="px-10 1200px:px-16 rounded-3xl hover:bg-gray-200 cursor-pointer border-2 border-black font-semibold py-2"
          >
            Back
          </div>
          <button
            onClick={handleContinue}
            type="submit"
            className="px-16 rounded-3xl bg-blue-500  hover:bg-blue-600 cursor-pointer text-white font-semibold py-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetails;

interface AiComponentProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  finalSummary?: string;
  setfinalSummary: (value: string) => void;
  enhanceValue: () => void;
}

const AiComponent: React.FC<AiComponentProps> = (props) => {
  return (
    <>
      <p className="text-xl bg-gradient-to-br from-pink-600 bg-clip-text text-transparent via-violet-400 to-violet-400  font-semibold  text-gray-700">
        Enhance with Ai
      </p>
      <div>
        <textarea
          value={props?.finalSummary}
          onChange={props?.onChange}
          rows={7}
          className={`w-full text-[12px] p-2 outline-none border border-gray-400 rounded-lg mt-2`}
          placeholder="I do frontend and backend both using MERN stack"
        ></textarea>
        <div
          onClick={props?.enhanceValue}
          className={`ml-auto cursor-pointer ${
            props?.finalSummary?.length &&
            "bg-gradient-to-r hover:text-gray-200"
          } from-pink-400 via-pink-400 to-violet-400 items-center w-[160px] bg-gray-300 p-1 px-5 rounded-full flex gap-2 text-[12px] font-bold text-gray-700`}
        >
          <p>Enhance with AI</p> <GrMagic />
        </div>
      </div>
    </>
  );
};
