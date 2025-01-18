import React, { SetStateAction, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { IoLanguage } from "react-icons/io5";
import { PiUserCircleDashed } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";
import { LuChevronUp } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { ResumeType } from "../editPage1/WorkExperience";
import { useLazyQuery } from "@apollo/client";
import { RootState, useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import TemplateProvider from "../../TemplateProvider";
import { UPDATE_RESUME } from "../../utils";
import { useSelector } from "react-redux";

interface Props {
  resume: ResumeType | null;
}

interface LanguagesType {
  name: string;
  proficiency: string;
}

interface SectionType {
  heading: string;
  summary: string;
}

const AddSection: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [open, setopen] = useState<string[]>([]);
  const [linksData, setlinksData] = useState<string[]>([]);
  const [updateResumeinBackend, { error }] = useLazyQuery(UPDATE_RESUME);
  const dispatch = useAppDispatch();
  const [languagesData, setlanguagesData] = useState<LanguagesType[]>([]);
  const [sectionsData, setsectionsData] = useState<SectionType[]>([]);
  const { formating } = useSelector((state:RootState) => state.resume);

  useEffect(() => {
    if (props?.resume?.links?.length) {
      setlinksData(props.resume?.links);
      setopen((prev) => [...prev, "links"]);
    }
    if (props?.resume?.customSections?.length) {
      setsectionsData(props.resume?.customSections);
      setopen((prev) => [...prev, "custom-section"]);
    }
    if (props?.resume?.languages?.length) {
      setlanguagesData(props.resume?.languages);
      setopen((prev) => [...prev, "language"]);
    }
  }, [props?.resume]);

  const handleContinue = () => {
    console.log(
      sectionsData.map((section) => section) || [],
      languagesData.map((language) => language) || [],
      linksData.map((link) => link) || []
    );
    updateResumeinBackend({
      variables: {
        resumeData: {
          customSections:
            sectionsData.map((section) => {
              return {
                heading: section.heading,
                summary: section.summary,
              };
            }) || [],
          languages:
            languagesData.map((language) => {
              return {
                name: language.name,
                proficiency: language.proficiency,
              };
            }) || [],
          links:
            linksData.map((link) => {
              return link;
            }) || [],
          currentPath: window.location.href,
        },
        resumeid: props?.resume?._id,
      },
    });

    if (error) {
      console.log(error);
    } else {
      dispatch(
        updateResume({
          customSections: sectionsData,
          languages: languagesData,
          links: linksData,
          currentPath: window.location.href,
        })
      );
      navigate(`?page=4&templateid=${props?.resume?._id}&edit=complete`);
    }

    // console.log(props?.resume)
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5 gap-5  grid-cols-6 ">
          <div className="col-span-4 w-full   px-5  h-full ">
            <h3 className="mt-16 font-bold text-3xl text-slate-800">
              Add More Details
            </h3>
            <p className="mt-1 mb-6">
              This is an opportunity to highlight qualifications that don't fit
              into standard resume sections.
            </p>
            {/* 1 */}
            <Languages
              languagesData={languagesData}
              setlanguagesData={setlanguagesData}
              open={open}
              setopen={setopen}
            />

            {/* 2  */}
            <Links
              linksData={linksData}
              setlinksData={setlinksData}
              open={open}
              setopen={setopen}
            />
            {/* 3 j */}
            <Custom_Section
              sectionsData={sectionsData}
              setsectionsData={setsectionsData}
              open={open}
              setopen={setopen}
            />
          </div>
          <div className="col-span-2 pt-8 min-h-[80vh] w-full h-full max-h-screen overflow-y-scroll hide ">
            <div>
              {" "}
              <TemplateProvider formating={formating} resume={props?.resume} />
            </div>
          </div>{" "}
        </div>
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
    </div>
  );
};

export default AddSection;

interface LanguagesProps {
  open: string[];
  setopen: React.Dispatch<SetStateAction<string[]>>;
  languagesData: LanguagesType[];
  setlanguagesData: React.Dispatch<SetStateAction<LanguagesType[]>>;
}
const Languages: React.FC<LanguagesProps> = (props) => {
  return (
    <div
      className={` border relative border-gray-400 mt-2 overflow-hidden rounded-md ease-in-out transition-all duration-700 ${
        props?.open.includes("language") && "pb-6  border-pink-400 "
      }  `}
    >
      <div
        onClick={() => {
          if (props?.open.includes("language")) {
            props?.setopen((p: string[]) =>
              p.filter((str) => str !== "language")
            );
          } else {
            props?.setopen((p) => [...p, "language"]);
          }
        }}
        className={`  flex gap-4 hover:bg-pink-200 cursor-pointer   items-center ${
          props?.open?.includes("language") && "bg-pink-200"
        }  p-3`}
      >
        <IoLanguage className="text-lg"></IoLanguage>
        <div>
          <p className="font-bold text-gray-700">Languages</p>

          <p className="text-sm text-gray-500 text-[11.9px] leading-4">
            If you are proficient in one or more languages, mention them in this
            section.
          </p>
        </div>
      </div>

      {props?.open.includes("language") && (
        <div className="w-full  h-full overflow-y-scroll  p-4 ">
          {props?.languagesData?.map((language: LanguagesType, i: number) => {
            return (
              <div
                key={i}
                className=" mb-2  grid grid-cols-12 items-center gap-5 w-full "
              >
                <CustomInput
                  placeholder="English"
                  value={language?.name}
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props?.setlanguagesData((prev: LanguagesType[]) =>
                      prev?.map((lang, index) =>
                        index === i ? { ...lang, name: e.target.value } : lang
                      )
                    );
                  }}
                  title="Language"
                  containerClassName="w-full col-span-6 "
                />
                <select
                  title="Select Language"
                  value={language?.proficiency}
                  onChange={(e) => {
                    props?.setlanguagesData((p: LanguagesType[]) => {
                      return p.map((lang, index) =>
                        index === i
                          ? { ...lang, proficiency: e.target.value }
                          : lang
                      );
                    });
                  }}
                  className="col-span-5 text-gray-600 group w-full border-2 p-2 mt-5 rounded-md hover:shadow-md focus:shadow-md border-gray-300 outline-none focus:border-pink-400"
                  name=""
                  id=""
                >
                  <option className="p-2 h-40 group-focus:hidden">
                    Select Proficiency
                  </option>
                  <option className="p-2 h-40" value={"Beginner"}>
                    Beginner
                  </option>
                  <option className="p-2 h-40" value={"Intermediate"}>
                    Intermediate
                  </option>
                  <option className="p-2 h-40" value={"Advanced"}>
                    Advanced
                  </option>
                  <option className="p-2 h-40" value={"Fluent"}>
                    Fluent
                  </option>
                </select>

                <MdDelete
                  onClick={() => {
                    props?.setlanguagesData((prev: LanguagesType[]) =>
                      prev.filter((_, index) => index !== i)
                    );
                  }}
                  className="text-white col-span-1 p-1 mt-4 cursor-pointer rounded-md min-w-8 text-3xl bg-red-400 hover:bg-red-500"
                ></MdDelete>
              </div>
            );
          })}

          <p
            onClick={() => {
              props?.setlanguagesData((p) => [
                ...p,
                {
                  name: "",
                  proficiency: "",
                },
              ]);
            }}
            className="text-blue-500 mt-4 hover:underline text-sm font-semibold cursor-pointer"
          >
            + Add another
          </p>
        </div>
      )}

      {props?.open.includes("language") && (
        <div className="w-full absolute bottom-1 flex justify-center">
          <LuChevronUp
            onClick={() => {
              props?.setopen((p) => p.filter((str) => str !== "language"));
            }}
            className="cursor-pointer text-gray-600 hover:text-gray-950 text-3xl"
          />
        </div>
      )}
    </div>
  );
};

interface LinksProps {
  open: string[];
  setopen: React.Dispatch<SetStateAction<string[]>>;
  linksData: string[];
  setlinksData: React.Dispatch<SetStateAction<string[]>>;
}
const Links: React.FC<LinksProps> = (props) => {
  return (
    <div
      className={` border ${
        props?.open.includes("links") && "pb-6 border-pink-400 "
      }  relative border-gray-400 mt-2 overflow-hidden rounded-md ease-in-out transition-all duration-700`}
    >
      <div
        onClick={() => {
          if (props?.open.includes("links")) {
            props?.setopen((p) => p.filter((str) => str !== "links"));
          } else {
            props?.setopen((p) => [...p, "links"]);
          }
        }}
        className={`  flex gap-4 hover:bg-pink-200 cursor-pointer   items-center ${
          props?.open?.includes("links") && "bg-pink-200"
        }  p-3`}
      >
        <PiUserCircleDashed className="text-lg scale-150"></PiUserCircleDashed>
        <div>
          <p className="font-bold text-gray-700">Websites and Social Links</p>
          <p className="text-sm text-gray-500 text-[11.9px] leading-4">
            Include a direct link to your portfolio or samples of your work for
            an added boost. Let your skills speak for themselves! This link is
            invalid. Please double-check your entry.
          </p>
        </div>
      </div>

      {props?.open.includes("links") && (
        <div className="w-full  h-full overflow-y-scroll  p-4 gap-4">
          {props?.linksData?.map((link: string, i: number) => (
            <div key={i} className=" flex gap-5 mb-2">
              <CustomInput
                title={`Link ${i + 1}`}
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props?.setlinksData((links) =>
                    links.map((link: string, index: number) =>
                      index === i ? e.target.value : link
                    )
                  );
                }}
                value={link}
                containerClassName="w-full"
                placeholder="Enter url"
              />
              <MdDelete
                onClick={() => {
                  props?.setlinksData((prev) =>
                    prev.filter((_, index) => index !== i)
                  );
                }}
                className="text-white p-1 mt-6 cursor-pointer rounded-md min-w-8 text-3xl bg-red-400 hover:bg-red-500"
              ></MdDelete>
            </div>
          ))}

          <p
            onClick={() => props?.setlinksData((prev) => [...prev, ""])}
            className="text-blue-500 mt-4 hover:underline text-sm font-semibold cursor-pointer"
          >
            + Add another
          </p>
        </div>
      )}

      {props?.open.includes("links") && (
        <div className="w-full absolute bottom-1 flex justify-center">
          <LuChevronUp
            onClick={() => {
              props?.setopen((p) => p.filter((str) => str !== "links"));
            }}
            className="cursor-pointer text-gray-600 hover:text-gray-950 text-3xl"
          />
        </div>
      )}
    </div>
  );
};

interface Custom_SectionProps {
  open: string[];
  setopen: React.Dispatch<SetStateAction<string[]>>;
  sectionsData: SectionType[];
  setsectionsData: React.Dispatch<SetStateAction<SectionType[]>>;
}

const Custom_Section: React.FC<Custom_SectionProps> = (props) => {
  return (
    <div
      className={` border ${
        props?.open.includes("custom-section") && "pb-6 border-pink-400 "
      }  relative border-gray-400 mt-2 overflow-hidden rounded-md ease-in-out transition-all duration-700`}
    >
      <div
        onClick={() => {
          if (props?.open.includes("custom-section")) {
            props?.setopen((p) => p.filter((str) => str !== "custom-section"));
          } else {
            props?.setopen((p) => [...p, "custom-section"]);
          }
        }}
        className={`  flex gap-4 hover:bg-pink-200 cursor-pointer   items-center ${
          props?.open?.includes("custom-section") && "bg-pink-200"
        }  p-3`}
      >
        <BiPencil className="text-lg "></BiPencil>
        <div>
          <p className="font-bold text-gray-700"></p>
          <p className="text-sm text-gray-500 text-[11.9px] leading-4">
            If you are proficient in one or more , mention them in this section.
            entry.
          </p>
        </div>
      </div>

      {props?.open.includes("custom-section") && (
        <>
          {props?.sectionsData?.map((section, i) => {
            return (
              <>
                {" "}
                <div className="w-full  h-full overflow-y-scroll  p-4 gap-4">
                  <div className=" flex gap-5">
                    <CustomInput
                      placeholder="Write Heading"
                      title="Heading"
                      onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props?.setsectionsData((prev) =>
                          prev.map((sec, index) =>
                            index === i
                              ? { ...sec, heading: e.target.value }
                              : sec
                          )
                        );
                      }}
                      value={section?.heading}
                      containerClassName="w-full"
                    />
                    <MdDelete
                      onClick={() =>
                        props.setsectionsData((prev) =>
                          prev.filter((_, index) => index !== i)
                        )
                      }
                      className="text-white p-1 mt-6 cursor-pointer rounded-md min-w-8 text-3xl bg-red-400 hover:bg-red-500"
                    ></MdDelete>
                  </div>
                  <p
                    className={` text-[13px] mt-2 font-semibold text-gray-700 uppercase`}
                  >
                    BRIEF DESCRIPTION
                  </p>
                  <textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      props?.setsectionsData((prev) =>
                        prev.map((sec, index) =>
                          index === i
                            ? { ...sec, summary: e.target.value }
                            : sec
                        )
                      );
                    }}
                    value={section?.summary}
                    placeholder="Write anything..."
                    name=""
                    className="w-full border-2 outline-none focus:border-pink-400 border-gray-300 rounded-md mt-1 p-2 "
                    rows={6}
                    id=""
                  ></textarea>
                </div>
              </>
            );
          })}
          <p
            onClick={() => {
              props?.setsectionsData((prev) => [
                ...prev,
                { heading: "", summary: "" },
              ]);
            }}
            className="text-blue-500 mt-4 hover:underline text-sm font-semibold cursor-pointer"
          >
            + Add another
          </p>
        </>
      )}

      {props?.open.includes("custom-section") && (
        <div className="w-full absolute bottom-1 flex justify-center">
          <LuChevronUp
            onClick={() => {
              props?.setopen((p) =>
                p.filter((str) => str !== "custom-section")
              );
            }}
            className="cursor-pointer text-gray-600 hover:text-gray-950 text-3xl"
          />
        </div>
      )}
    </div>
  );
};
