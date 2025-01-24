import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResumeType } from "../editPage1/WorkExperience";
import { useLazyQuery } from "@apollo/client";
import { RootState, useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import { DateInput } from "./Aboutjob/DateInput";
import TemplateProvider from "../../TemplateProvider";
import { UPDATE_RESUME } from "../../utils";
import { useSelector } from "react-redux";
import { MdOutlinePreview } from "react-icons/md";

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
  const [previewOpen, setpreviewOpen] = useState(false);

  const { formating } = useSelector((state: RootState) => state.resume);

  let experienceNumber: number = Number(searchParam.get("experience")) - 1 || 0;
  if (experienceNumber == -1) experienceNumber = 0;

  const handleContinue = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (
      !experience?.jobTitle ||
      !experience?.companyName ||
      !experience?.startDate ||
      !experience?.location
    ) {
      return;
    }
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

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5 gap-5 grid-cols-6 ">
          <form
            onSubmit={handleContinue}
            className="col-span-10 1200px:col-span-4  w-full    h-full "
          >
            <h3 className="mt-6 600px:mt-10 1200px:mt-16 font-bold text-xl 600px:text-2xl 1200px:text-3xl text-slate-800">
              Let’s work on your experience
            </h3>
            <p className="mt-2 text-sm 600px:text-lg 1200px:text-xl">
              Start with your most recent job first.
            </p>

            <div>
              <MdOutlinePreview
                onClick={() => setpreviewOpen(true)}
                className="text-[40px] p-2 mt-4 bg-green-500 text-white rounded-md ml-auto  1200px:hidden"
              ></MdOutlinePreview>
            </div>
            <div className="grid mt-6  grid-cols-1 800px:grid-cols-2 gap-5  w-full">
              <CustomInput
                required
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
                required
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
                required
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
            <div className="grid  grid-cols-1 800px:grid-cols-2 gap-5 mt-5  w-full">
              <DateInput
                required
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
              <button
                type="submit"
                onClick={() => navigate(-1)}
                className="px-10 1200px:px-16 rounded-3xl hover:bg-gray-200 cursor-pointer border-2 border-black font-semibold py-2"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-16 rounded-3xl bg-blue-500  hover:bg-blue-600 cursor-pointer text-white font-semibold py-2"
              >
                Continue
              </button>
            </div>
          </form>
          {previewOpen && (
            <div
              onClick={() => setpreviewOpen(false)}
              className="absolute 1200px:hidden h-full w-full bg-[#00000044] top-0 left-0 flex justify-center items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[430px] px-4"
              >
                <TemplateProvider formating={formating} resume={resume} />
              </div>
            </div>
          )}
          <div className="col-span-2 max-1200px:hidden pt-8 w-full h-full max-h-screen overflow-y-scroll hide ">
            <TemplateProvider formating={formating} resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
