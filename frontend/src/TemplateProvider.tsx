import React, { useImperativeHandle, useRef, useState } from "react";
import { ResumeType } from "./resumeEdit/editPage1/WorkExperience";
import PreviewTemplate from "./PreviewTemplate";
import { downloadResume } from "./utils";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

interface ResumeProps {
  resume: ResumeType;
}

// gray 900 for small heading and 500 for para
// text size 60% for small heading and 53% for para
// mt 3%

const formatDate = (timestamp: string | null) => {
  if (!timestamp) return "Present";
  const date = new Date(parseInt(timestamp, 10));
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};

const TemplateProvider: React.FC<ResumeProps> = ({ resume }) => {
  const [showPreview, setshowPreview] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      {showPreview && (
        <PreviewTemplate setshowPreview={setshowPreview} resume={resume} />
      )}

      <div className=" bg-white rounded flex-col   h-full  flex  items-center shadow-md">
        <div className="flex justify-between w-full mb-2  text-blue-500  font-semibold text-lg ">
          <p className="hover:text-blue-600 cursor-pointer">
            Change TemplateProvider
          </p>
          <p
            onClick={() =>
              navigate(`?page=4&templateid=${resume?._id}&edit=complete`)
            }
            className="hover:text-blue-600 cursor-pointer"
          >
            Preview
          </p>
        </div>
        <div className="border rounded-md  shadow-lg border-gray-500">
          <Template resume={resume} />
        </div>
      </div>
    </>
  );
};

export default TemplateProvider;

interface TemplateProps {
  resume: ResumeType;
  onClick?: (event: Event) => void;
  text?: string;
  formating?: {
    fontSize: number;
    headingSize: number;
    sectionSpacing: number;
    paragraphSpreading: number;
    lineSpacing: number;
    fontFamily: string;
  };
}

export const Template: React.FC<TemplateProps> = (props) => {
  const { resume, onClick, text, templateFunctionsRef, formating } = props;
  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef, // Kis component ko print karna hai
  });

  const handleDownloadResume = () => {
    downloadResume(resumeRef);
  };

  useImperativeHandle(templateFunctionsRef, () => ({
    handlePrint,
    handleDownloadResume,
  }));

  return (
    <div
      onClick={onClick}
      ref={resumeRef}
      style={{
        fontSize: formating?.fontSize,
        lineHeight: formating?.lineSpacing,
        fontFamily: formating?.fontFamily
      }}
      className={`rounded-md bg-white w-full p-6 pt-3 hide max-w-[500px] ${text}`}
    >
      <p className="text-[115%] text-gray-800 font-bold">
        {resume?.personalInfo?.fullName}
      </p>
      <p className="text-[53%] text-gray-500">
        {resume?.personalInfo?.phone} {resume?.personalInfo?.address?.state},{" "}
        {resume?.personalInfo?.address?.country},{" "}
        {resume?.personalInfo?.address?.pincode}
      </p>
      {/* summary section  */}
      <div
        style={{ marginTop: formating?.sectionSpacing }}
        className="mt-[2px]"
      >
        <p
          style={{ fontSize: formating?.headingSize }}
          className="text-[60%] font-semibold text-black mt-[1%]"
        >
          SUMMARY
        </p>
        <p className="text-[53%] text-gray-500">
          {resume?.professionalSummary}
        </p>
      </div>

      {/* custom section  */}
      <div style={{ marginTop: formating?.sectionSpacing }}>
        {resume?.customSections?.map((section) => (
          <div className="mt-[2px]">
            <p className="text-[60%] font-semibold uppercase text-black mt-[1%]">
              {section?.heading}
            </p>
            <p className="text-[53%] text-gray-500">{section?.summary}</p>
          </div>
        ))}
      </div>

      {/* skills section  */}
      <div
        style={{
          marginTop: formating?.sectionSpacing,
        }}
        className="mt-[2px]"
      >
        <p
          style={{ fontSize: formating?.headingSize }}
          className="text-[60%] font-semibold text-black mt-[1%]"
        >
          SKILLS
        </p>
        <div className="flex flex-wrap text-[53%] text-gray-500">
          {resume?.skills?.map((sk: string, index: number) => (
            <div className="w-[50%] flex gap-2 items-center" key={index}>
              <p className="h-[3px] w-[3px] rounded-full bg-gray-500"></p>
              <p>{sk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* experience section  */}
      <div
        style={{
          marginTop: formating?.sectionSpacing,
          lineHeight: formating?.lineSpacing,
        }}
        className="mt-[2px]"
      >
        <p
          style={{ fontSize: formating?.headingSize }}
          className="text-[60%] font-semibold text-black mt-[1%]"
        >
          EXPERIENCE
        </p>
        {resume?.workExperience?.map((workExperience) => (
          <div className="mb-[3px]">
            <p className="text-[55%] font-semibold text-gray-800 leading-none ">
              {workExperience?.jobTitle} at {workExperience?.companyName}{" "}
              {/* {
                new Date(Number(workExperience?.startDate))
                  ?.toISOString()
                  .split("T")[0]
              } */}
              {formatDate(workExperience?.startDate)}-
              {formatDate(workExperience?.endDate)}
              {/* {workExperience?.currentlyWorking
                ? "Current"
                : new Date(Number(workExperience?.endDate))
                    ?.toISOString()
                    .split("T")[0]} */}
            </p>
            <p className="text-[55%] font-semibold mb-[3px] text-gray-800">
              {workExperience?.location}
            </p>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  workExperience?.responsibilities ||
                  `<p className={'hidden'}></p>`,
              }}
              className="text-[53%] text-gray-500"
            >
              {/* {workExperience?.responsibilities} */}
            </p>
          </div>
        ))}
      </div>

      {/* education and training  */}
      <div
        style={{
          marginTop: formating?.sectionSpacing,
        }}
        className="mt-[2px]"
      >
        <p
          style={{
            fontSize: formating?.headingSize,
            lineHeight: formating?.lineSpacing,
          }}
          className="text-[60%] font-semibold text-black mt-[1%]"
        >
          EDUCATION AND TRAINING
        </p>
        {resume?.education?.map((education) => (
          <div className="mb-[3px]">
            <p className="text-[55%] capitalize  font-semibold text-gray-800 leading-none ">
              {education?.degree}
            </p>
            <p className="text-[55%]   font-semibold mb-[3px] text-gray-800">
              {education?.institution}
            </p>

            {education?.otherCourses?.map((course) => (
              <div className="flex gap-2 ml-3 leading-tight items-center">
                <p className="h-[3px] w-[3px] rounded-full bg-gray-500"></p>
                <p className="text-[55%]   font-semibold mb-[3px] text-gray-800">
                  {course}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* languages  */}
      <div
        style={{
          marginTop: formating?.sectionSpacing,
        }}
        className="mt-[2px]"
      >
        <p className="text-[60%] font-semibold  w-full text-black mt-[1%]">
          LANGUAGES
        </p>
        <div className="grid grid-cols-2">
          {resume?.languages?.map((language) => (
            <div className="mt-[2px] ">
              <p className="text-[55%] mb-1 capitalize  font-semibold text-gray-800  ">
                {language?.name}:
              </p>
              <div className="h-1 w-[70%]  border bg-gray-400 mt-[1%]">
                <p
                  className={`
         ${language?.proficiency == "Beginner" && "w-[25%]"}
         ${language?.proficiency == "Intermediate" && "w-[50%]"}
          ${language?.proficiency == "Advanced" && "w-[75%]"}
          ${language?.proficiency == "Fluent" && "w-[100%]"} bg-black h-full `}
                ></p>
              </div>
              <p className="text-[55%]   font-semibold mb-[3px] text-gray-800">
                ({language?.proficiency})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Links  */}
      <div
        style={{
          marginTop: formating?.sectionSpacing,
        }}
        className="mt-[2px]"
      >
        <p
          style={{ fontSize: formating?.headingSize }}
          className="text-[60%] font-semibold text-black mt-[1%]"
        >
          WEBSITES, PORTFOLIOS, PROFILES
        </p>
        {resume?.links?.map((link) => (
          <div className="mb-[3px] ">
            <div className="flex gap-2 ml-3 leading-tight items-center">
              <p className="h-[3px] w-[3px] rounded-full bg-gray-500"></p>
              <a
                href={link}
                className="text-[55%] text-blue-500   font-semibold mb-[3px]"
              >
                {link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
