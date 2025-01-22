import React, { useCallback, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { ResumeType } from "../editPage1/WorkExperience";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useLazyQuery } from "@apollo/client";
import { RootState, useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import TemplateProvider from "../../TemplateProvider";
import { UPDATE_RESUME } from "../../utils";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  resume: ResumeType | null;
}

export interface EducationType {
  degree: string;
  institution: string;
  endDate: string;
  otherCourses: string[];
}

const EducationDetails: React.FC<Props> = ({ resume }) => {
  const navigate = useNavigate();
  const [works, setworks] = useState<string[]>([]);
  const [searchParam] = useSearchParams();
  const [education, seteducation] = useState<EducationType>({
    degree: "",
    institution: "",
    endDate: "",
    otherCourses: [],
  });
  const [updateResumeInBackend, { error }] = useLazyQuery(UPDATE_RESUME);
  const dispatch = useAppDispatch();
  const [courseEndDate, setcourseEndDate] = useState<string>("");
  const [educationNumber, seteducationNumber] = useState<number>(0);
  const { formating } = useSelector((state: RootState) => state.resume);

  useEffect(() => {
    let edNumber: number = Number(searchParam.get("education")) - 1 || 0;
    if (edNumber == -1) edNumber = 0;

    seteducationNumber(edNumber);
  }, [searchParam]);

  if (error) {
    console.log(error);
  }

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (works?.length && !works[works?.length - 1]) {
      toast.error("Course cannot be empty");
      console.log(works?.length, works[works?.length - 1]);
      return;
    }
    const updatedEducation:
      | {
          degree: string;
          institution: string;
          endDate: string;
          otherCourses: string[];
        }[]
      | undefined = resume?.education?.map((edu: EducationType) => ({
      degree: edu?.degree,
      institution: edu?.institution,
      endDate: edu?.endDate,
      otherCourses: edu?.otherCourses,
    }));
    if (updatedEducation)
      updatedEducation[educationNumber] = {
        degree: education?.degree,
        institution: education?.institution,
        endDate: courseEndDate,
        otherCourses: works,
      };

    updateResumeInBackend({
      variables: {
        resumeData: {
          education: updatedEducation,
          currentPath: window.location.href,
        },
        resumeid: resume?._id,
      },
    });

    if (!error) {
      dispatch(
        updateResume({
          education: updatedEducation,
          currentPath: window.location.href,
        })
      );
    }
    navigate(
      `?page=4&templateid=${resume?.templateData?.templateid}&edit=skills-details`
    );
  };

  const setDataToLocalStates = useCallback(() => {
    console.log(educationNumber);
    if (resume?.education?.length) {
      console.log(resume?.education[educationNumber]);

      seteducation(
        resume?.education[educationNumber] || {
          degree: "",
          institution: "",
          endDate: "",
          otherCourses: [],
        }
      );

      setworks(resume?.education[educationNumber]?.otherCourses || []);
    }
  }, [educationNumber, resume?.education]);

  useEffect(() => {
    setDataToLocalStates();
  }, [resume, educationNumber, setDataToLocalStates]);

  return (
    <div className="w-full flex justify-center">
      <Toaster />
      <form onSubmit={handleContinue} className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5  grid-cols-6 gap-5 ">
          <div className="col-span-4 w-full    h-full ">
            <h3 className="mt-16 font-bold text-3xl text-slate-800">
              Let’s talk about your education
            </h3>
            <p className="mt-2">
              Tell us about any colleges, vocational programs, or training
              courses you took. Even if you didn’t finish, it’s important to
              list them.
            </p>
            <div className="flex gap-3 justify-end  ">
              {resume?.experience !== "no experience" && (
                <div
                  className=" flex gap-2 py-[6px] px-6 items-center text-pink-400 hover:text-pink-500 border-pink-400 cursor-pointer hover:border-pink-500 hover:shadow-xl bg-white border rounded-md"
                  onClick={() =>
                    navigate(
                      `?page=4&templateid=ghfh457t88ygurhg&edit=experience-details&experience=${
                        resume?.workExperience?.length
                          ? resume?.workExperience?.length + 1
                          : 1
                      }`
                    )
                  }
                >
                  <FaLongArrowAltLeft />
                  <p> Add more experience</p>
                </div>
              )}
              <div
                className=" flex gap-2 py-[6px] px-6 items-center bg-pink-400 cursor-pointer hover:bg-pink-500 hover:shadow-xl text-gray-100 border rounded-md"
                onClick={() => {
                  if (resume?.education?.length) {
                    const updatedEducation = resume?.education?.map(
                      (edu: EducationType) => ({
                        degree: edu?.degree || "",
                        institution: edu?.institution || "",
                        endDate: edu?.endDate || "",
                        otherCourses: edu?.otherCourses || [],
                      })
                    );
                    updatedEducation[educationNumber] = {
                      degree: education?.degree,
                      institution: education?.institution,
                      endDate: education.endDate,
                      otherCourses: works,
                    };

                    updateResumeInBackend({
                      variables: {
                        resumeData: {
                          education: updatedEducation,
                          currentPath: window.location.href,
                        },
                        resumeid: resume?._id,
                      },
                    });

                    if (!error) {
                      dispatch(
                        updateResume({
                          education: updatedEducation,
                          currentPath: window.location.href,
                        })
                      );
                    }

                    navigate(
                      `?page=4&templateid=${
                        resume?.templateData?.templateid
                      }&edit=education-details&education=${
                        resume?.education?.length
                          ? resume.education?.length + 1
                          : 1
                      }`
                    );
                  }
                }}
              >
                <p> Add more Education</p>
                <FaLongArrowAltRight className="text-lg" />
              </div>
            </div>
            <div className="grid grid-cols-1 mt-4 gap-5  w-full">
              <CustomInput
                required
                autofocus
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  seteducation((p) => ({ ...p, institution: e.target.value }));
                }}
                value={education?.institution}
                title="school name"
                placeholder="Delhi Public School (DPS) "
              ></CustomInput>
            </div>
            <div className="grid mt-5 grid-cols-2 gap-4  w-full">
              <CustomInput
                required
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  seteducation((p) => ({ ...p, degree: e.target.value }));
                }}
                value={education?.degree}
                title="degree"
                placeholder="Enter your degree name "
              ></CustomInput>
              <div className=" flex gap-4">
                <CustomInput
                  required
                  value={
                    courseEndDate
                      ? courseEndDate
                      : education?.endDate
                      ? `${JSON.stringify(
                          new Date(Number(education?.endDate)).getFullYear()
                        )}-${JSON.stringify(
                          new Date(Number(education?.endDate)).getMonth() + 1
                        ).padStart(2, "0")}`
                      : ""
                  }
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (Number(e.target.value) > 12) {
                      return;
                    }
                    setcourseEndDate(e.target.value);
                    seteducation((p) => ({
                      ...p,
                      endDate: e.target.value,
                    }));
                  }}
                  title="graduation date"
                  placeholder="Month "
                  type="month"
                ></CustomInput>{" "}
              </div>
            </div>

            {/* add more skills  */}

            <div className="mt-5 ">
              <p
                onClick={() => {
                  if (!works.length) {
                    setworks([""]);
                  }
                }}
                className={`text-blue-700 text-[14px] font-semibold cursor-pointer hover:underline`}
              >
                {works?.length ? "-" : "+"} Add course work or other details
              </p>

              {works?.length ? (
                <>
                  <div
                    onClick={() => {
                      if (!works[works.length - 1])
                        return toast.error("Course field cannot be empty");
                      if (works[works.length - 1]) {
                        setworks((p) => [...p, ""]);
                      }
                    }}
                    className="h-8 w-24 ml-auto cursor-pointer  bg-pink-400 mt-2 text-gray-100 hover:shadow-xl hover:bg-pink-500 flex justify-center items-center rounded-md"
                  >
                    <IoAddSharp /> Add
                  </div>
                  <div className="mt-5">
                    {works.map((work: string, i: number) => (
                      <div className="flex gap-1 items-center">
                        <CustomInput
                          onchange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newArray: string[] = [...works];
                            newArray[i] = e.target.value;
                            setworks(newArray);
                          }}
                          value={work}
                          containerClassName="w-full mt-2 "
                          placeholder="Figma course UI UX design"
                          title={`work ${i + 1}`}
                        />

                        <div
                          onClick={() => {
                            const filterWorks = works.filter(
                              (_, index) => index !== i
                            );
                            setworks(filterWorks);
                          }}
                          className="h-8 w-8 cursor-pointer  text-2xl text-gray-500 hover:text-black mt-6  flex justify-center items-center rounded-md"
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div>
              {resume?.education?.length && resume?.education?.length > 1 ? (
                <p className="text-xl font-semibold text-gray-700 mt-4">
                  Your's Education's
                </p>
              ) : null}
              {resume?.education?.map((edu, i: number) => {
                if (i == educationNumber) return null;
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `?page=4&templateid=${
                          resume?.templateData?.templateid
                        }&edit=education-details&education=${i + 1}`
                      );
                      setDataToLocalStates();
                    }}
                    className="px-5 py-2 border mt-3 font-semibold text-gray-700 hover:border-pink-500 cursor-pointer hover:bg-pink-200 border-gray-500 rounded-md"
                  >
                    {edu?.degree}, {edu?.institution}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-2 pt-8 w-full h-full max-h-screen overflow-y-scroll hide ">
            <TemplateProvider formating={formating} resume={resume} />
          </div>{" "}
        </div>
        <div className="flex mt-4  justify-between">
          <div
            onClick={() => navigate(-1)}
            className="px-16 rounded-3xl hover:bg-gray-200 cursor-pointer border-2 border-black font-semibold py-2"
          >
            Back
          </div>
          <button
            type="submit"
            className="px-16 rounded-3xl bg-blue-500  hover:bg-blue-600 cursor-pointer text-white font-semibold py-2"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationDetails;
