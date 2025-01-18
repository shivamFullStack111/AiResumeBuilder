import React, { useState } from "react";
import { ResumeType, UPDATE_RESUME } from "../editPage1/WorkExperience";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaChevronDown } from "react-icons/fa";
import { useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";

interface Props {
  resume?: ResumeType | null;
}

const Templates: React.FC<Props> = ({ resume }) => {
  const [updateResumeInBackend] = useLazyQuery(UPDATE_RESUME);
  const [color, setcolor] = useState<string>("");
  const [columns, setcolumns] = useState<string[]>([]);
  const [graphics, setgraphics] = useState<string[]>([]);
  const [photo, setphoto] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleContinue = (templateId: string) => {
    dispatch(
      updateResume({
        templateData: {
          templateid: templateId,
          color: color,
        },
      })
    );

    updateResumeInBackend({
      variables: {
        resumeData: {
          templateData: {
            templateid: templateId,
            color: color,
          },
        },
        resumeid: resume?._id,
      },
    });

    navigate("?page=4&templateid=ghfh457t88ygurhg&edit=basic-details");
  };

  return (
    <div className="w-full relative flex flex-col items-center py-4">
      <div
        id="absoluteDiv"
        className="fixed bg-white  top-0 z-50 left-0 flex flex-col items-center w-full "
      >
        <div className="text-3xl flex justify-center gap-2 items-center mt-6 font-bold text-gray-700 ">
          <img className="h-16 w-12" src="/logo4.png" alt="" />{" "}
          <div className="flex flex-col mt-4 justify-center ">
            <p>Templates we recommend for you</p>{" "}
            <p className="mt-3 text-gray-600 font-semibold text-center text-xl">
              You can always change your template later.
            </p>
          </div>
        </div>

        <div className="flex w-full justify-center  ">
          <div className="w-[75%] max-w-[1000px] mt-8 flex px-5  gap-2 rounded-lg border border-gray-300 shadow-lg shadow-blue-100 py-3  justify-center items-center bg-gray-200">
            <p className="text-sm col-span-1  font-semibold">Filters:</p>
            <div className="grid grid-cols-10 gap-3 w-full">
              <div className="h-10 w-full col-span-2 rounded-md shadow-md border-2 border-white hover:border-blue-400 flex items-center group cursor-pointer  bg-white">
                <div className="flex px-2 relative w-full justify-between">
                  <p className="text-sm">Headshot</p>
                  <FaChevronDown className="ml-auto group-hover:rotate-180 transition-all duration-300 text-gray-700 text-lg"></FaChevronDown>
                  <div className="absolute z-30 w-full -bottom-[85px]  hidden transition-all group-hover:block  bg-white border border-gray-400 rounded-md left-0">
                    <div
                      onClick={() => {
                        if (!photo.includes("with-photo"))
                          setphoto((prev) => [...prev, "with-photo"]);
                        else {
                          const newData = photo.filter(
                            (p) => p !== "with-photo"
                          );
                          setphoto(newData);
                        }
                      }}
                      className="flex gap-2 items-center cursor-pointer p-2 text-sm"
                    >
                      <input
                        id="photo1"
                        placeholder="head"
                        className="h-4 w-4"
                        type="checkbox"
                        checked={photo.includes("with-photo")}
                      />
                      <p>With Photo</p>
                    </div>
                    <div
                      onClick={() => {
                        if (!photo.includes("without-photo"))
                          setphoto((prev) => [...prev, "without-photo"]);
                        else {
                          const newData = photo.filter(
                            (p) => p !== "without-photo"
                          );
                          setphoto(newData);
                        }
                      }}
                      className="flex gap-2 items-center cursor-pointer p-2 text-sm"
                    >
                      <input
                        id="photo2"
                        placeholder="head"
                        className="h-4 w-4"
                        type="checkbox"
                        checked={photo.includes("without-photo")}
                      />
                      <p>Without Photo</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-10 w-full col-span-2 rounded-md shadow-md border-2 border-white hover:border-blue-400 flex items-center group cursor-pointer  bg-white">
                <div className="flex px-2 relative w-full justify-between">
                  <p className="text-sm">Graphics</p>
                  <FaChevronDown className="ml-auto group-hover:rotate-180 transition-all duration-300 text-gray-700 text-lg"></FaChevronDown>
                  <div className="absolute z-30 w-full -bottom-[85px]  hidden transition-all group-hover:block  bg-white border border-gray-400 rounded-md left-0">
                    <div
                      onClick={() => {
                        if (!graphics.includes("with-graphics"))
                          setgraphics((prev) => [...prev, "with-graphics"]);
                        else {
                          const newData = graphics.filter(
                            (p) => p !== "with-graphics"
                          );
                          setgraphics(newData);
                        }
                      }}
                      className="flex gap-2 items-center cursor-pointer p-2 text-sm"
                    >
                      <input
                        id="graphic1"
                        placeholder="graphic1"
                        className="h-4 w-4"
                        type="checkbox"
                        checked={graphics.includes("with-graphics")}
                      />
                      <p>With Graphics</p>
                    </div>
                    <div
                      onClick={() => {
                        if (!graphics.includes("without-graphics"))
                          setgraphics((prev) => [...prev, "without-graphics"]);
                        else {
                          const newData = graphics.filter(
                            (p) => p !== "without-graphics"
                          );
                          setgraphics(newData);
                        }
                      }}
                      className="flex gap-2 items-center cursor-pointer p-2 text-sm"
                    >
                      <input
                        checked={graphics.includes("without-graphics")}
                        id="graphic2"
                        placeholder="graphic2"
                        className="h-4 w-4"
                        type="checkbox"
                      />
                      <p>Without Graphics</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-10 w-full col-span-2 rounded-md shadow-md border-2 border-white hover:border-blue-400 flex items-center group cursor-pointer  bg-white">
                <div className="flex px-2 relative w-full justify-between">
                  <p className="text-sm">Columns</p>
                  <FaChevronDown className="ml-auto group-hover:rotate-180 transition-all duration-300 text-gray-700 text-lg"></FaChevronDown>
                  <div className="absolute z-30 w-full -bottom-[85px]  hidden transition-all group-hover:block  bg-white border border-gray-400 rounded-md left-0">
                    <div
                      onClick={() => {
                        if (!columns.includes("1-columns"))
                          setcolumns((prev) => [...prev, "1-columns"]);
                        else {
                          const newData = columns.filter(
                            (p) => p !== "1-columns"
                          );
                          setcolumns(newData);
                        }
                      }}
                      className="flex gap-2 items-center cursor-pointer p-2 text-sm"
                    >
                      <input
                        id="col1"
                        placeholder="col1"
                        className="h-4 w-4"
                        type="checkbox"
                        checked={columns.includes("1-columns")}
                      />
                      <p>1 Cloumns</p>
                    </div>
                    <div
                      onClick={() => {
                        if (!columns.includes("2-columns"))
                          setcolumns((prev) => [...prev, "2-columns"]);
                        else {
                          const newData = columns.filter(
                            (p) => p !== "2-columns"
                          );
                          setcolumns(newData);
                        }
                      }}
                      className="flex gap-2 items-center cursor-pointer p-2 text-sm"
                    >
                      <input
                        id="col2"
                        placeholder="col2"
                        className="h-4 w-4"
                        type="checkbox"
                        checked={columns.includes("2-columns")}
                      />
                      <p>2 Columns</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full col-span-3 flex px-2   items-center">
                <p className="font-semibold text-sm">Colors:</p>
                <div
                  onClick={() => setcolor("bg-red-400")}
                  className={`w-9 h-9 border-4  cursor-pointer ${
                    color == "bg-red-400" && "border-blue-300"
                  }  rounded-full bg-red-400 ml-2`}
                ></div>
                <div
                  onClick={() => setcolor("bg-gray-400")}
                  className={`w-9 h-9 border-4  cursor-pointer ${
                    color == "bg-gray-400" && "border-blue-300"
                  }  rounded-full bg-gray-400 ml-2`}
                ></div>
                <div
                  onClick={() => setcolor("bg-green-400")}
                  className={`w-9 h-9 border-4  cursor-pointer ${
                    color == "bg-green-400" && "border-blue-300"
                  }  rounded-full bg-green-400 ml-2`}
                ></div>
                <div
                  onClick={() => setcolor("bg-purple-400")}
                  className={`w-9 h-9 border-4  cursor-pointer ${
                    color == "bg-purple-400" && "border-blue-300"
                  }  rounded-full bg-purple-400 ml-2`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex mxn justify-center  w-full ">
        <div className={`w-full max-w-[1000px] px-3 mt-[220px]   `}>
          <p className="text-sm">Showing all templates (43)</p>
          <div className="grid w-full mt-4 gap-8 grid-cols-3">
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  onClick={() => handleContinue("frhjgjrhg4568gfhb")}
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] border-2 border-gray-400 rounded-md group cursor-pointer overflow-hidden relative">
              <div className="w-full absolute flex justify-center -bottom-12  group-hover:bottom-3 transition-all duration-300  ">
                <button
                  type="button"
                  title="choose"
                  className="bg-blue-500 text-white py-2 w-[80%] rounded-3xl "
                >
                  Choose template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
