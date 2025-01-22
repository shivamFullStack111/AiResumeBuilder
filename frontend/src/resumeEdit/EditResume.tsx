import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../home/Header";
import WorkExperience from "./editPage1/WorkExperience";
import CountryPage from "./editPage2/CountryPage";
import Templates from "./editPage3/Templates";
import MainEditing from "./editPage4/MainEditing";
import { setMyResumes, setResume } from "../store/slices/resumeSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { useSelector } from "react-redux";

const GET_RESUME = gql`
  query ($resumeid: String) {
    getResume(resumeid: $resumeid) {
      _id
      userEmail
      onStep
      skills
      hobbies
      workExperience {
        jobTitle
        companyName
        startDate
        endDate
        location
        responsibilities
        currentlyWorking
      }
      templateData {
        templateid
        color
        withPhotos
        withGraphics
        columns
      }
      personalInfo {
        fullName
        email
        phone
        address {
          pincode
          state
          country
        }
        linkedin
        portfolio
      }

      targetCountry
      links
      imageUrl
      experience
      education {
        degree
        institution
        startDate
        endDate
        otherCourses
      }
      customSections {
        heading
        summary
      }
      professionalSummary
      currentPath
      projects
      certifications
      achievements
      languages {
        name
        proficiency
      }
      references
      volunteerExperience
      createdAt
      updatedAt
    }
  }
`;

const EditResume: React.FC = () => {
  const param = useParams();
  const [searchParam] = useSearchParams();
  const dispatch = useAppDispatch();
  const { myResumes } = useSelector((state: RootState) => state.resume);

  const { data, loading } = useQuery(GET_RESUME, {
    variables: { resumeid: param?.resumeid },
  });
  const { resume } = useAppSelector((state: RootState) => state.resume);

  useEffect(() => {
    if (data) {
      dispatch(setResume(data?.getResume));
      if (myResumes?.length) {
        const isExist = myResumes?.find(
          (res) => res._id == data?.getResume?._id
        );
        if (!isExist) dispatch(setMyResumes([...myResumes, data?.getResume]));
      }
    }
  }, [data, dispatch, myResumes]);

  const page: string | null = searchParam.get("page");

  if (loading) return <Loader />;

  return (
    <div>
      {page == "3" || page == "4" ? null : <Header />}
      <div className="mxn">
        {page === "1" && <WorkExperience resume={resume} />}
        {page === "2" && <CountryPage resume={resume} />}
        {page === "3" && <Templates resume={resume} />}
      </div>
      {page === "4" && <MainEditing resume={resume} />}
    </div>
  );
};

export default EditResume;
