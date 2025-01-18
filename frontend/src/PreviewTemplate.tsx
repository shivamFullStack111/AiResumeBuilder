import React, { useRef } from "react";
import { Template } from "./TemplateProvider";
import { IoMdDownload } from "react-icons/io";
import { ResumeType } from "./resumeEdit/editPage1/WorkExperience";

interface PreviewTemplateProps {
  setshowPreview: (value: boolean) => void;
  resume: ResumeType | null;
}
const PreviewTemplate: React.FC<PreviewTemplateProps> = (props) => {
  const { resume, setshowPreview } = props;
  const templateFunctionsRef = useRef<{
    handleDownloadResume: () => void;
    handlePrint: () => void;
  }>({ handleDownloadResume: () => {}, handlePrint: () => {} });

  return (
    <div
      onClick={() => setshowPreview(false)}
      className="absolute w-full z-40 bg-[#0005] pb-2 flex-col gap-3  h-full top-0 left-0 flex justify-center items-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  w-full max-w-[500px]   flex justify-between"
      >
        <p></p>
        <div
          onClick={() => templateFunctionsRef?.current?.handleDownloadResume()}
        >
          <IoMdDownload className="text-white mt-2 text-3xl rounded-md p-1 cursor-pointer bg-blue-500 hover:bg-blue-600" />
        </div>
      </div>
      <Template
        templateFunctionsRef={templateFunctionsRef}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        resume={resume}
      />
    </div>
  );
};

export default PreviewTemplate;
