import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResumeType, UPDATE_RESUME } from "../editPage1/WorkExperience";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import { DateInput } from "./Aboutjob/DateInput";
import TemplateProvider from "../../TemplateProvider";

interface Props {
  resume: ResumeType | null;
}

interface ExperienceType {
  jobTitle?: string;
  companyName?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  responsibilities?: string;
  currentlyWorking?: boolean;
}

const ExperienceDetails: React.FC<Props> = ({ resume }) => {
  const navigate = useNavigate();
  const [updateResumeinBackend] = useLazyQuery(UPDATE_RESUME);
  const [experience, setexperience] = useState<ExperienceType>();
  const [searchParam] = useSearchParams();
  const dispatch = useAppDispatch();

  let experienceNumber: number = Number(searchParam.get("experience")) - 1 || 0;
  if (experienceNumber == -1) experienceNumber = 0;

  const handleContinue = () => {
    const updatedWorkExperience = [...(resume?.workExperience || [])];

    if (experience) {
      updatedWorkExperience[experienceNumber] = experience;
      console.log(experienceNumber);
      console.log(updatedWorkExperience);
    }

    updateResumeinBackend({
      variables: {
        resumeData: {
          workExperience: updatedWorkExperience?.map((exp) => {
            return {
              jobTitle: exp?.jobTitle,
              companyName: exp?.companyName,
              startDate: exp?.startDate,
              endDate: exp?.endDate,
              location: exp?.location,
              responsibilities: exp?.responsibilities,
              currentlyWorking: exp?.currentlyWorking,
            };
          }),
        },
        resumeid: resume?._id,
        currentPath: window.location.href,
      },
    });

    dispatch(updateResume({ workExperience: updatedWorkExperience }));

    navigate(
      `?page=4&templateid=ghfh457t88ygurhg&edit=about-job-details&experience=${
        experienceNumber + 1
      }`
    );
  };

  useEffect(() => {
    if (resume?.workExperience?.length) {
      setexperience({
        jobTitle: resume?.workExperience[experienceNumber]?.jobTitle || "",
        companyName:
          resume?.workExperience[experienceNumber]?.companyName || "",
        startDate: resume?.workExperience[experienceNumber]?.startDate || "",
        endDate: resume?.workExperience[experienceNumber]?.endDate || "",
        location: resume?.workExperience[experienceNumber]?.location || "",
        responsibilities:
          resume?.workExperience[experienceNumber]?.responsibilities || "",
        currentlyWorking:
          resume?.workExperience[experienceNumber]?.currentlyWorking || false,
      });
    }
  }, [resume, experienceNumber]);

  useEffect(() => {
    console.log(experience);
  }, [experience]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5 gap-5 grid-cols-6 ">
          <div className="col-span-4 w-full    h-full ">
            <h3 className="mt-16 font-bold text-3xl text-slate-800">
              Let’s work on your experience
            </h3>
            <p className="mt-2">Start with your most recent job first.</p>
            <div className="grid grid-cols-2 gap-5  w-full">
              <CustomInput
                onchange={(e: ChangeEvent<HTMLInputElement>) => {
                  setexperience((p) => ({
                    ...p,
                    jobTitle: e.target.value,
                  }));
                }}
                value={experience?.jobTitle}
                autofocus
                title="job title"
                placeholder="Senior software Engineer"
              ></CustomInput>
              <CustomInput
                onchange={(e: ChangeEvent<HTMLInputElement>) => {
                  setexperience((p) => ({
                    ...p,
                    companyName: e.target.value,
                  }));
                }}
                value={experience?.companyName}
                title="Company name"
                placeholder="Microsoft"
              ></CustomInput>
            </div>
            <div className="grid mt-5 gap-4  w-full">
              <CustomInput
                onchange={(e: ChangeEvent<HTMLInputElement>) => {
                  setexperience((p) => ({
                    ...p,
                    location: e.target.value,
                  }));
                }}
                value={experience?.location}
                title="location"
                placeholder="18/4 2nd floor taj palace near railway station, delhi "
              ></CustomInput>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5  w-full">
              <DateInput
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setexperience((p) => ({
                    ...p,
                    startDate: e.target.value,
                  }));
                }}
                value={experience?.startDate ? experience.startDate : ""}
                placeholder="Select date"
                title="Start date"
              ></DateInput>
              {!experience?.currentlyWorking && (
                <DateInput
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setexperience((p) => ({
                      ...p,
                      endDate: e.target.value,
                    }));
                  }}
                  value={experience?.endDate || ""}
                  placeholder="Select date"
                  title="End date"
                ></DateInput>
              )}
            </div>
            <label
              htmlFor="kk"
              className="mt-5 w-full items-center flex justify-end"
            >
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setexperience((p) => ({
                    ...p,
                    currentlyWorking: e.target.checked,
                  }))
                }
                checked={experience?.currentlyWorking}
                id="kk"
                className="h-5 w-5"
                type="checkbox"
              />
              <span className="ml-2 text-sm">I am currently working here</span>
            </label>

            <div className="flex mt-10  justify-between">
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
          <div className="col-span-2 pt-8 w-full h-full max-h-screen overflow-y-scroll hide ">
            <TemplateProvider resume={resume} />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
