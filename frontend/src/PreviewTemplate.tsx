import React, { useRef } from "react";
import { Template } from "./TemplateProvider";
import { IoMdDownload } from "react-icons/io";
import { downloadResume } from "./utils";

const PreviewTemplate: React.FC = (props) => {
  const { resume, setshowPreview } = props;
  const templateFunctionsRef = useRef();

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
        onClick={(e: Event) => e.stopPropagation()}
        downloadResume={downloadResume}
        resume={resume}
      />
    </div>
  );
};

export default PreviewTemplate;
