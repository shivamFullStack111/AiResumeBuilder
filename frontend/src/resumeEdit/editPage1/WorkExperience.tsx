import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import { UPDATE_RESUME } from "../../utils";

export interface ResumeType {
  _id?: string;
  experience?: string;
  targetCountry?: string;
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: {
      pincode?: string;
      state?: string;
      country?: string;
    };
    linkedin?: string;
    portfolio?: string;
  };
  templateData?: {
    templateid?: string;
    color?: string;
    withPhotos?: boolean;
    withGraphics?: boolean;
    columns?: number;
  };
  links?: string[];

  userEmail?: string;
  imageUrl?: string;
  currentPath?: string;
  skills?: string[];
  onStep?: number;
  hobbies?: string[];
  customSections?: {
    heading: string;
    summary: string;
  }[];
  workExperience?: {
    jobTitle?: string;
    companyName?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    responsibilities?: string;
    currentlyWorking?: boolean;
  }[];
  education?: {
    degree: string;
    institution: string;
    endDate: string;
    otherCourses: string[];
  }[];
  projects?: string[];
  certifications?: string[];
  achievements?: string[];
  languages?: {
    name: string;
    proficiency: string;
  }[];
  references?: string[];
  volunteerExperience?: string[];
  createdAt?: string;
  updatedAt?: string;
  professionalSummary?: string;
}

interface Props {
  resume: ResumeType | null;
}

const WorkExperience: React.FC<Props> = ({ resume }) => {
  const [updateResumeinBackend] = useLazyQuery(UPDATE_RESUME);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpdateResume = async () => {
    const currentPath = window.location.href;

    updateResumeinBackend({
      variables: {
        resumeData: { experience: resume?.experience, onStep: 2, currentPath },
        resumeid: resume?._id,
      },
    });

    navigate("?page=2");
  };

  return (
    <div className="w-full flex flex-col items-center py-10">
      <img src="/logo2.png" className="h-14 w-[60px]" alt="" />
      <p className="text-3xl font-bold text-gray-700 mt-6">
        How much work experience do you have?
      </p>
      <p className="mt-2 text-gray-600 font-semibold text-xl">
        We can give you better advice and guidance if we know.
      </p>

      <div className="w-full  flex justify-center gap-4 mt-10">
        <div className="flex justify-">
          <div
            onClick={() => {
              dispatch(updateResume({ experience: "no experience" }));
            }}
            className={`h-12 w-44 rounded-lg border-2 border-gray-500 cursor-pointer hover:border-pink-600 flex justify-center items-center  font-semibold text-gray-500 hover:text-pink-600 ${
              resume?.experience == "no experience"
                ? "border-pink-600 text-pink-600"
                : ""
            }`}
          >
            No Experience{" "}
          </div>
        </div>
        <div className="flex justify-">
          <div
            onClick={() => {
              dispatch(updateResume({ experience: "entry-level" }));
            }}
            className={`h-12 w-44 rounded-lg border-2 border-gray-500 cursor-pointer hover:border-pink-600 flex justify-center items-center  font-semibold text-gray-500 hover:text-pink-600 ${
              resume?.experience == "entry-level"
                ? "border-pink-600 text-pink-600"
                : ""
            }`}
          >
            Entry-level{" "}
          </div>
        </div>
        <div className="flex justify-">
          <div
            onClick={() => {
              dispatch(updateResume({ experience: "mid-level" }));
            }}
            className={`h-12 w-44 rounded-lg border-2 border-gray-500 cursor-pointer hover:border-pink-600 flex justify-center items-center  font-semibold text-gray-500 hover:text-pink-600 ${
              resume?.experience == "mid-level"
                ? "border-pink-600 text-pink-600"
                : ""
            }`}
          >
            Mid-level{" "}
          </div>
        </div>
        <div className="flex justify-">
          <div
            onClick={() => {
              dispatch(updateResume({ experience: "senior" }));
            }}
            className={`h-12 w-44 rounded-lg border-2 border-gray-500 cursor-pointer hover:border-pink-600 flex justify-center items-center  font-semibold text-gray-500 hover:text-pink-600 ${
              resume?.experience == "senior"
                ? "border-pink-600 text-pink-600"
                : ""
            }`}
          >
            Senior{" "}
          </div>
        </div>
      </div>

      {resume?.experience && (
        <div className="py-4 px-8 flex flex-col items-center mt-10 bg-pink-200 w-[500px] rounded-xl">
          <div className="font-semibold text-gray-800 text-lg">
            {resume?.experience == "no experience" &&
              "Typically less than 6 months or 0 months experience"}
            {resume?.experience == "entry-level" &&
              "Typically 6 months to 3 years experience"}
            {resume?.experience == "mid-level" &&
              "Typically 3-10 years experience"}
            {resume?.experience == "senior" && "Typically 10+ years experience"}
          </div>

          <p className="text-gray-600 text-center mt-2  ">
            We've got you! We'll help you find relevant experience to fill in
            your resume.
          </p>
        </div>
      )}

      {resume?.experience && (
        <div
          onClick={handleUpdateResume}
          className="bg-blue-500 text-white flex justify-center items-center px-36 mt-8 cursor-pointer py-3 text-lg font-semibold hover:bg-blue-600 rounded-lg"
        >
          Continue
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
