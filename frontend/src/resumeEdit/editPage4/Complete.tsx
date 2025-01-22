import React, { useEffect, useRef, useState } from "react";
import { Template } from "../../TemplateProvider";
import { GiPencilBrush } from "react-icons/gi";
import { MdDelete, MdTextFormat } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { IoDownload } from "react-icons/io5";
import { FaPrint } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { setformating, setMyResumes } from "../../store/slices/resumeSlice";
import { DELETE_RESUME, FormatingType } from "../../utils";
import { ResumeType } from "../editPage1/WorkExperience";

interface CompleteProps {
  resume: ResumeType | null;
  sethiddenSideBar: (value: boolean) => void;
}

const Complete: React.FC<CompleteProps> = (props) => {
  const [active, setactive] = useState(1);
  const templateFunctionsRef = useRef<{
    handlePrint: () => void;
    handleDownloadResume: () => void;
  }>({ handlePrint: () => {}, handleDownloadResume: () => {} });
  // const [formating, setformating] = useState(defaultFormating);
  const { formating } = useSelector((state: RootState) => state.resume);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props) props?.sethiddenSideBar(true);
  }, [props]);

  useEffect(() => {
    if (props?.resume?.templateData?.color)
      dispatch(
        setformating({
          ...formating,
          fontColor: props?.resume?.templateData?.color,
        })
      );
  }, [props?.resume, dispatch]);

  return (
    <div className=" overflow-y-scroll min-h-screen bg-blue-900 flex justify-center ">
      <div className="w-full grid grid-cols-4 mt-10 max-w-[1200px]  justify-center">
        <LeftSide
          formating={formating}
          // setformating={setformating}
          active={active}
          setactive={setactive}
        ></LeftSide>
        <div className="h- col-span-2">
          <div className="w-full p-5 h-full bg-slate-800 flex justify-center rounded-lg bg-white-100">
            <Template
              formating={formating}
              templateFunctionsRef={templateFunctionsRef}
              text=""
              resume={props?.resume}
            />
          </div>
        </div>
        <RightSide
          resume={props?.resume}
          templateFunctionsRef={templateFunctionsRef}
        />
      </div>
    </div>
  );
};

export default Complete;

interface LeftSideProps {
  active: number;
  setactive: (value: number) => void;
  // setformating: (value: FormatingType) => void;
  formating: FormatingType;
}

const LeftSide: React.FC<LeftSideProps> = (props) => {
  const { active, setactive, formating } = props;
  const { resume } = useSelector((state: RootState) => state.resume);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(formating);
  }, [formating]);

  return (
    <div className=" col-span-1 p-4">
      <div className="w-full h-full  rounded-lg bg-blue-700">
        <div className="w-full h-12 bg-blue-900 grid grid-cols-2">
          <div
            className={`w-full h-full  ${
              active == 1 ? "bg-blue-700" : "bg-blue-800"
            } p-2 rounded-t-2xl ronded `}
          >
            <div
              className={`w-full h-full  cursor-pointer hover:bg-pink-100 hover:text-black  rounded-xl flex justify-center items-center text-sm font-semibold ${
                active == 1 ? "bg-pink-100 text-black" : "text-pink-100"
              } gap-2`}
              onClick={() => setactive(1)}
            >
              <GiPencilBrush></GiPencilBrush> <p>Design</p>{" "}
            </div>
          </div>
          <div
            className={`w-full h-full  ${
              active == 2 ? "bg-blue-700" : "bg-blue-800"
            } p-2 rounded-t-2xl `}
          >
            <div
              className={`w-full h-full  cursor-pointer hover:bg-pink-100 hover:text-black  rounded-xl flex justify-center items-center text-sm font-semibold ${
                active == 2 ? "bg-pink-100 text-black" : "text-pink-100"
              } gap-2`}
              onClick={() => setactive(2)}
            >
              <MdTextFormat className="text-lg"></MdTextFormat>{" "}
              <p>Formatting</p>{" "}
            </div>
          </div>
        </div>

        {/* designs templates  */}
        {active == 1 && (
          <div className="p-4">
            <p className="text-white font-bold text-sm ">
              Colors {formating.fontColor}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-red-600" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating.fontColor == "text-red-600" && "border-2"
                } bg-red-500`}
              ></div>
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-green-600" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating?.fontColor == "text-green-600" &&
                  "border-2 border-gray-300"
                } bg-green-500`}
              ></div>
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-blue-600" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating?.fontColor == "text-blue-600" &&
                  "border-2 border-gray-300"
                } bg-blue-500`}
              ></div>
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-black" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating?.fontColor == "text-black" &&
                  "border-2 border-gray-300"
                } bg-black`}
              ></div>
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-pink-600" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating?.fontColor == "text-pink-600" &&
                  "border-2 border-gray-300"
                } bg-pink-500  `}
              ></div>
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-violet-600" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating?.fontColor == "text-violet-600" &&
                  "border-2 border-gray-300"
                } bg-violet-500`}
              ></div>
              <div
                onClick={() =>
                  dispatch(
                    setformating({ ...formating, fontColor: "text-orange-600" })
                  )
                }
                className={`h-8 w-8 rounded-full cursor-pointer hover:border-2  ${
                  formating?.fontColor == "text-orange-600" &&
                  "border-2 border-gray-300"
                } bg-orange-500`}
              ></div>
            </div>
            <p className="text-white font-bold text-sm mt-4 ">Templates</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {Array.from({ length: 1 }).map((_, i: number) => (
                <div
                  key={i}
                  className="w-full bg-white overflow-y-scroll hide h-40 rounded-md cursor-pointer"
                >
                  <Template text={"text-[5px]"} resume={resume} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* formatting  */}
        {active == 2 && (
          <div className="p-4">
            <p className="text-white font-bold text-sm ">Font Formatting</p>
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">Font Style</p>
              <select
                title="Font Family"
                value={formating?.fontFamily}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      fontFamily: e.target.value,
                    })
                  )
                }
                className="w-full mt-1 p-2 bg-blue-800 text-white border-blue-800 focus:border-white border-2  outline-none rounded-md"
                name="font "
              >
                {[
                  { label: "Arial", value: "Arial, sans-serif" },
                  { label: "Verdana", value: "Verdana, sans-serif" },
                  { label: "Helvetica", value: "Helvetica, sans-serif" },
                  { label: "Tahoma", value: "Tahoma, sans-serif" },
                  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
                  { label: "Times New Roman", value: "Times New Roman, serif" },
                  { label: "Georgia", value: "Georgia, serif" },
                  { label: "Garamond", value: "Garamond, serif" },
                  { label: "Courier New", value: "Courier New, monospace" },
                  {
                    label: "Lucida Console",
                    value: "Lucida Console, monospace",
                  },
                  { label: "Roboto", value: "Roboto, sans-serif" },

                  {
                    label: "Playfair Display",
                    value: "Playfair Display, serif",
                  },
                ].map((family) => (
                  <option value={family?.value}>{family?.label}</option>
                ))}
              </select>
            </div>
            {/* font size  */}
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">Font Size</p>
              <input
                placeholder="."
                className="mt-1 w-full h-[2px]"
                min={1}
                max={50}
                value={formating?.fontSize}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      fontSize: Number(e.target.value),
                    })
                  )
                }
                type="range"
              />
            </div>
            {/* heading size  */}
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">Heading Size</p>
              <input
                placeholder="."
                value={formating?.headingSize}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      headingSize: Number(e.target.value),
                    })
                  )
                }
                className="mt-1 w-full h-[2px]"
                min={1}
                max={50}
                type="range"
              />
            </div>
            <p className="w-full border border-dashed border-gray-400 mt-6 mb-6"></p>
            <p className="text-white font- font-bold text-sm ">
              Document Formatting
            </p>
            {/* section spreading  */}
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">
                Section Spacing
              </p>
              <input
                value={formating?.sectionSpacing}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      sectionSpacing: Number(e.target.value),
                    })
                  )
                }
                placeholder="."
                className="mt-1 w-full h-[2px]"
                min={1}
                max={50}
                type="range"
              />
            </div>
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">
                Paragraph Spreading
              </p>
              <input
                placeholder="."
                value={formating?.paragraphSpreading}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      paragraphSpreading: Number(e.target.value),
                    })
                  )
                }
                className="mt-1 w-full h-[2px]"
                min={1}
                max={50}
                type="range"
              />
            </div>
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">Line Spacing</p>
              <input
                placeholder="."
                value={formating?.lineSpacing}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      lineSpacing: Number(e.target.value),
                    })
                  )
                }
                className="mt-1 w-full h-[2px]"
                min={0}
                max={5}
                step={0.2}
                type="range"
              />
            </div>

            <p className="w-full border border-dashed border-gray-400 mt-6 mb-6"></p>

            <p className="text-white font- font-bold text-sm ">
              Image Formatting
            </p>
            <div className="mt-6">
              <p className="text-white font-semibold text-sm ">Image Size</p>
              <input
                value={formating?.imageSize}
                onChange={(e) =>
                  dispatch(
                    setformating({
                      ...formating,
                      imageSize: Number(e.target.value),
                    })
                  )
                }
                placeholder="."
                className="mt-1 w-full h-[2px]"
                min={30}
                max={200}
                type="range"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface RightSideProps {
  resume: ResumeType | null;
  templateFunctionsRef: React.RefObject<{
    handlePrint: () => void;
    handleDownloadResume: () => void;
  }>;
}
const RightSide: React.FC<RightSideProps> = (props) => {
  const [deleteResume, { error }] = useLazyQuery(DELETE_RESUME);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myResumes } = useSelector((state: RootState) => state.resume);

  const handleDeleteResume = () => {
    console.log(props?.resume);
    deleteResume({
      variables: {
        resumeId: props?.resume?._id,
      },
    });

    if (!error) {
      dispatch(
        setMyResumes(myResumes.filter((res) => res?._id !== props?.resume?._id))
      );
      navigate("/");
    }
  };

  return (
    <div className="h- col-span-1 p-4">
      <div className="w-full h-full rounded-lg ">
        <div className="flex justify-center w-full gap-2 ">
          <div
            onClick={() => {
              props?.templateFunctionsRef?.current?.handleDownloadResume();
            }}
            className="bg-white rounded-lg hover:bg-green-400 cursor-pointer text-black px-5 flex flex-col justify-center items-center p-2"
          >
            <IoDownload className="text-2xl "></IoDownload>
            <p className="text-[10px] font-semibold">Download</p>
          </div>
          <div
            onClick={() => props?.templateFunctionsRef?.current?.handlePrint()}
            className="bg-white rounded-lg hover:bg-green-400 cursor-pointer text-black px-5 flex flex-col justify-center items-center p-2"
          >
            <FaPrint className="text-xl"></FaPrint>
            <p className="text-[10px] font-semibold">Print</p>
          </div>
          <div
            onClick={handleDeleteResume}
            className="bg-white rounded-lg hover:bg-red-500 cursor-pointer hover:text-white text-black px-5 flex flex-col justify-center items-center p-2"
          >
            <MdDelete className="text-2xl"></MdDelete>
            <p className="text-[10px] font-semibold">Delete</p>
          </div>
        </div>
        <div className="w-full flex mt-4 justify-center">
          <div
            onClick={() => navigate("/")}
            className="w-[180px] font-bold text-white bg-blue-500 hover:bg-blue-600 py-3 rounded-full text-center cursor-pointer "
          >
            Save & Next
          </div>
        </div>
      </div>
    </div>
  );
};
