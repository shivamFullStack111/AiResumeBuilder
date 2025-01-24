import { useSearchParams } from "react-router-dom";
import SideBar from "./SideBar";
import BasicDetails from "./BasicDetails";
import ExperienceDetails from "./ExperienceDetails";
import AboutJob from "./Aboutjob/AboutJob";
import EducationDetails from "./EducationDetails";
import SkillsDetails from "./SkillsDetails";
import SummaryDetails from "./SummaryDetails";
import AddSection from "./AddSection";
import { ResumeType } from "../editPage1/WorkExperience";
import Complete from "./Complete";
import { useEffect, useState } from "react";

interface Props {
  resume: ResumeType | null;
}

const MainEditing: React.FC<Props> = ({ resume }) => {
  const [param] = useSearchParams();
  const [hiddenSideBar, sethiddenSideBar] = useState(false);

  const page: string | null = param.get("edit");

  useEffect(() => {
    if(window.innerWidth<1200) sethiddenSideBar(true)
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1200) {
        sethiddenSideBar(true);
      } else {
        sethiddenSideBar(false);
      }
    });
  }, []);

  return (
    <div
      className={`flex h-screen absolute top-0 left-0 w-full ${
        hiddenSideBar && "px-5"
      }  overflow-hidden `}
    >
      <SideBar hiddenSideBar={hiddenSideBar} />
      <div className="h-full overflow-hidden w-full overflow-y-scroll hide">
        {page == "basic-details" && <BasicDetails resume={resume} />}
        {page == "experience-details" && <ExperienceDetails resume={resume} />}
        {page == "about-job-details" && <AboutJob resume={resume} />}
        {page == "education-details" && <EducationDetails resume={resume} />}
        {page == "skills-details" && <SkillsDetails resume={resume} />}
        {page == "summary-details" && <SummaryDetails resume={resume} />}
        {page == "add-section-details" && <AddSection resume={resume} />}
        {page == "complete" && (
          <Complete sethiddenSideBar={sethiddenSideBar} resume={resume} />
        )}
      </div>
    </div>
  );
};

export default MainEditing;
