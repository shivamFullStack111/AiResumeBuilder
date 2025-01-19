import React, { useImperativeHandle, useRef, useState } from "react";
import { ResumeType } from "./resumeEdit/editPage1/WorkExperience";
import PreviewTemplate from "./PreviewTemplate";
import { downloadResume, FormatingType } from "./utils";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

interface ResumeProps {
  resume: ResumeType | null;
  formating: FormatingType;
}

// gray 900 for small heading and 500 for para
// text size 60% for small heading and 53% for para
// mt 3%

const formatDate = (timestamp: string | null) => {
  if (!timestamp) return "Present";
  const date = new Date(parseInt(timestamp, 10));
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};

const TemplateProvider: React.FC<ResumeProps> = (props) => {
  const { resume, formating } = props;
  const [showPreview, setshowPreview] = useState<boolean>(false);
  const navigate = useNavigate();
  // Set CSS variables for template formatting
  const templateStyle = {
    "--template-font-size": formating?.fontSize + "px",
    "--template-line-spacing": formating?.lineSpacing,
    "--template-font-family": formating?.fontFamily,
  } as React.CSSProperties;

  return (
    <div style={templateStyle}>
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
    </div>
  );
};

export default TemplateProvider;

interface TemplateProps {
  resume: ResumeType | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  text?: string;
  formating?: FormatingType;
  templateFunctionsRef?: React.MutableRefObject<{
    handlePrint: () => void;
    handleDownloadResume: () => void;
  }> | null;
  containerClassName?: string;
}

export const Template: React.FC<TemplateProps> = (props) => {
  const { resume, onClick, text, templateFunctionsRef, formating } = props;
  const resumeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef, // Kis component ko print karna hai
  });

  const handleDownloadResume = () => {
    downloadResume(resumeRef);
  };

  const marginTop = {
    marginTop: formating?.sectionSpacing,
  };

  const fontSize = { fontSize: formating?.headingSize };

  useImperativeHandle(templateFunctionsRef, () => ({
    handlePrint,
    handleDownloadResume,
  }));

  const mainDivStyle = {
    fontSize: formating?.fontSize,
    lineHeight: formating?.lineSpacing,
    fontFamily: formating?.fontFamily,
  };

  return (
    <div
      onClick={onClick}
      className={`template-container rounded-md  bg-white w-full p-6 pt-3 hide  ${text} ${props?.containerClassName}`}
      ref={resumeRef}
      style={mainDivStyle}
      // className={`rounded-md bg-white w-full p-6 pt-3 hide max-w-[500px] ${text}`}
    >
      {/* basic details  */}
      <div
        onClick={() =>
          navigate(
            `?page=4&templateid=${props?.resume?._id}&edit=basic-details`
          )
        }
        className="border-2 border-white cursor-pointer hover:border-yellow-400"
      >
        <p
          className={`text-[115%] text-gray-800 font-bold ${formating?.fontColor}`}
        >
          {resume?.personalInfo?.fullName?.split("-")[0]}{" "}
          {resume?.personalInfo?.fullName?.split("-")[1]}
        </p>
        <p className="text-[53%] text-gray-500">
          {resume?.personalInfo?.phone} {resume?.personalInfo?.address?.state}{" "}
          {resume?.personalInfo?.address?.country}{" "}
          {resume?.personalInfo?.address?.pincode}{" "}
        </p>
      </div>
      {/* summary section  */}
      {resume?.professionalSummary && (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=summary-details`
            )
          }
          style={{ ...marginTop }}
          className="mt-[2px] border-2 border-white cursor-pointer hover:border-yellow-400"
        >
          <p
            style={fontSize}
            className={`text-[60%] font-semibold text-black mt-[1%] ${formating?.fontColor}`}
          >
            SUMMARY
          </p>
          <p className="text-[53%] text-gray-500">
            {resume?.professionalSummary}
          </p>
        </div>
      )}

      {/* custom section  */}
      {resume?.customSections?.length ? (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=add-section-details`
            )
          }
          className="border-2 border-white cursor-pointer hover:border-yellow-400"
          style={{ ...marginTop }}
        >
          {resume?.customSections?.map((section) => (
            <div className="mt-[2px]">
              <p className="text-[60%] font-semibold uppercase text-black mt-[1%]">
                {section?.heading}
              </p>
              <p className="text-[53%] text-gray-500">{section?.summary}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* skills section  */}
      {resume?.skills?.length ? (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=skills-details`
            )
          }
          style={{ ...marginTop }}
          className="mt-[2px] border-2 border-white cursor-pointer hover:border-yellow-400"
        >
          <p
            style={fontSize}
            className={`text-[60%] font-semibold text-black mt-[1%] ${formating?.fontColor}`}
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
      ) : null}

      {/* experience section  */}
      {resume?.experience?.length ? (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?._id}&edit=experience-details`
            )
          }
          style={{
            marginTop: formating?.sectionSpacing,
            lineHeight: formating?.lineSpacing,
          }}
          className="mt-[2px] border-2 border-white cursor-pointer hover:border-yellow-400"
        >
          <p
            style={fontSize}
            className={`text-[60%] font-semibold text-black mt-[1%] ${formating?.fontColor}`}
          >
            EXPERIENCE
          </p>
          {resume?.workExperience?.map((workExperience) => (
            <div className="mb-[3px]">
              <p className="text-[55%] font-semibold text-gray-800 leading-none ">
                {workExperience?.jobTitle} at {workExperience?.companyName}
                {workExperience?.startDate &&
                  formatDate(workExperience?.startDate)}
                -
                {workExperience?.endDate && formatDate(workExperience?.endDate)}
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
      ) : null}

      {/* education and training  */}
      {resume?.education?.length ? (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=education-details`
            )
          }
          style={{ ...marginTop }}
          className="mt-[2px] border-2 border-white cursor-pointer hover:border-yellow-400"
        >
          <p
            style={{
              fontSize: formating?.headingSize,
              lineHeight: formating?.lineSpacing,
            }}
            className={`text-[60%] font-semibold text-black mt-[1%] ${formating?.fontColor}`}
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
      ) : null}

      {/* languages  */}
      {resume?.languages?.length ? (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=add-section-details`
            )
          }
          style={{ ...marginTop }}
          className="mt-[2px] border-2 border-white cursor-pointer hover:border-yellow-400"
        >
          <p
            style={fontSize}
            className={`text-[60%] font-semibold text-black mt-[1%] ${formating?.fontColor}`}
          >
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
      ) : null}

      {/* Links  */}
      {resume?.links?.length ? (
        <div
          onClick={() =>
            navigate(
              `?page=4&templateid=${props?.resume?.templateData?.templateid}&edit=add-section-details`
            )
          }
          style={{ ...marginTop }}
          className="mt-[2px] border-2 border-white cursor-pointer hover:border-yellow-400"
        >
          <p
            style={fontSize}
            className={`text-[60%] font-semibold text-black mt-[1%] ${formating?.fontColor}`}
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
      ) : null}
    </div>
  );
};
