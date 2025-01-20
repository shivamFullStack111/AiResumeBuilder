import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResumeType } from "../../editPage1/WorkExperience";
import AiGenerated from "./AiGenerated";
import GenerateWithAi from "./GenerateWithAi";
import TextEditor from "./TextEditor";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "../../../store/store";
import { updateResume } from "../../../store/slices/resumeSlice";
import { UPDATE_RESUME } from "../../../utils";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
interface Props {
  resume: ResumeType | null;
}

const AboutJob: React.FC<Props> = ({ resume }) => {
  const navigate = useNavigate();
  const [active, setactive] = useState<number>(1);
  const [AiInput, setAiInput] = useState<string>("");
  const [responsibilities, setresponsibilities] = useState("");
  const [searchParam] = useSearchParams();
  const dispatch = useAppDispatch();
  const [updateResumeInBackend, { error }] = useLazyQuery(UPDATE_RESUME);

  let experienceNumber: number = Number(searchParam.get("experience")) - 1 || 0;
  if (experienceNumber == -1) experienceNumber = 0;

  useEffect(() => {
    if (resume?.workExperience?.length)
      setresponsibilities(
        resume?.workExperience[experienceNumber]?.responsibilities || ""
      );
  }, [resume?.workExperience, experienceNumber]);

  useEffect(() => {
    console.log(responsibilities);
  }, [responsibilities]);

  const handleContinue = () => {
    if (!responsibilities) {
      toast.error("Summary cannot be empty");
      return;
    }
    const workExperience =
      resume?.workExperience && resume?.workExperience[experienceNumber];
    const updatedWorkExperience = {
      companyName: workExperience?.companyName,
      currentlyWorking: workExperience?.currentlyWorking,
      endDate: workExperience?.endDate,
      jobTitle: workExperience?.jobTitle,
      location: workExperience?.location,
      responsibilities: responsibilities,
      startDate: workExperience?.startDate,
    };

    const resumeWorkExperience =
      resume?.workExperience &&
      resume?.workExperience.map((data) => ({
        companyName: data?.companyName,
        currentlyWorking: data?.currentlyWorking,
        endDate: data?.endDate,
        jobTitle: data?.jobTitle,
        location: data?.location,
        startDate: data?.startDate,
        responsibilities: data?.responsibilities || "",
      }));
    if (resumeWorkExperience)
      resumeWorkExperience[experienceNumber] = updatedWorkExperience;

    updateResumeInBackend({
      variables: {
        resumeData: {
          workExperience: resumeWorkExperience,
          currentPath: window.location.href,
        },
        resumeid: resume?._id,
      },
    });

    if (!error) {
      dispatch(updateResume({ workExperience: resumeWorkExperience }));

      navigate(`?page=4&templateid=${resume?._id}&edit=education-details`);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Toaster />
      <div className="w-full max-w-[1200px]">
        <h3 className="mt-16 font-bold text-3xl text-slate-800">
          Next, write about what you did as a Developer{" "}
        </h3>
        <p className="mt-2">
          Pick from our ready-to-use phrases or write your own and get AI
          writing help.
        </p>

        <div className="grid w-full bg-white mt-5 gap-5 grid-cols-2">
          <div>
            <div className="flex gap-5">
              <div
                onClick={() => setactive(1)}
                className={`p-2 px-4 rounded-full text-sm font-semibold border border-gray-400 ${
                  active == 1 && "bg-gray-300"
                } cursor-pointer hover:shadow-lg`}
              >
                Ai Generated
              </div>
              <div
                onClick={() => setactive(2)}
                className={`p-2 px-4 rounded-full text-sm font-semibold border border-gray-400 ${
                  active == 2 && "bg-gray-300"
                } cursor-pointer hover:shadow-lg`}
              >
                Generate with Ai
              </div>
            </div>

            {active == 1 && (
              <AiGenerated
                responsibilities={responsibilities}
                setresponsibilities={setresponsibilities}
                resume={resume}
              />
            )}
            {active == 2 && (
              <GenerateWithAi
                resume={resume}
                AiInput={AiInput}
                onChange={(e) => setAiInput(e.target.value)}
                responsibilities={responsibilities}
                setresponsibilities={setresponsibilities}
              />
            )}
          </div>

          {/* Right side */}
          <div className="border border-gray-400 rounded-md p-3">
            <TextEditor
              responsibilities={responsibilities}
              setresponsibilities={setresponsibilities}
            ></TextEditor>
          </div>
        </div>
        <div className="flex mt-10 w-full justify-between">
          <div
            onClick={() => navigate(-1)}
            className="px-16 rounded-3xl hover:bg-gray-200 cursor-pointer border-2 border-black font-semibold py-2"
          >
            Back
          </div>
          <div
            onClick={handleContinue}
            className="px-16 rounded-3xl bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2"
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutJob;
