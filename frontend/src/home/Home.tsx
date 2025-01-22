import React, { useEffect } from "react";
import Header from "./Header";
import LoginedProvider from "../protectedRoutes/LoginedProvider";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ResumeType } from "../resumeEdit/editPage1/WorkExperience";
import { RootState, useAppDispatch } from "../store/store";
import { setMyResumes } from "../store/slices/resumeSlice";
import { useSelector } from "react-redux";
import { Template } from "../TemplateProvider";
import { DELETE_RESUME } from "../utils";

const REGISTER_USER = gql`
  mutation ($name: String, $email: String, $phoneNumber: String) {
    register(name: $name, email: $email, phoneNumber: $phoneNumber) {
      name
      email
      phoneNumber
    }
  }
`;

const CREATE_RESUME = gql`
  mutation ($userEmail: String) {
    createResume(userEmail: $userEmail) {
      _id
      userEmail
    }
  }
`;

const GET_USER_ALL_RESUMES = gql`
  query ($userEmail: String) {
    getUserAllResumes(userEmail: $userEmail) {
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

const Home: React.FC = () => {
  const { user } = useUser();
  const [callRegister] = useMutation(REGISTER_USER);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteResume] = useLazyQuery(DELETE_RESUME);
  const { myResumes } = useSelector((state: RootState) => state.resume);

  const [getUserAllResumes, { data }] = useLazyQuery(GET_USER_ALL_RESUMES);
  // const { formating } = useSelector((state: RootState) => state.resume);

  useEffect(() => {
    if (user)
      getUserAllResumes({
        variables: {
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      });
  }, [user, getUserAllResumes]);

  useEffect(() => {
    if (data?.getUserAllResumes?.length)
      dispatch(setMyResumes(data?.getUserAllResumes));
  }, [data, dispatch]);

  const [createResume, { loading: createResume_loading, data: resume_data }] =
    useMutation(CREATE_RESUME);

  const handleCreateResume = async () => {
    try {
      createResume({
        variables: {
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  useEffect(() => {
    if (resume_data?.createResume) {
      navigate(`/resume/${resume_data.createResume._id}/edit?page=1`);
    }
  }, [resume_data, navigate]);

  useEffect(() => {
    if (user) {
      const userData = {
        email: user.primaryEmailAddress?.emailAddress,
        phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
        name: user.fullName,
      };

      callRegister({ variables: userData });
    }
  }, [user, callRegister]);

  return (
    <LoginedProvider>
      <Header />
      <div className="w-full mxn mt-10 font-sans">
        <div>
          <p className="text-2xl font-semibold text-gray-600 leading-none">
            {JSON.stringify(data)}
            Hey Jack
          </p>
          <p className="text-xl font-semibold text-gray-500">
            your work history
          </p>
          <div className="flex justify-center mt-10 ">
            <div className="bg-blue-200 font-semibold px-8 rounded-xl py-3 text-center">
              {" "}
              <p className="text-[16px] leading-tight text-gray-600">
                {" "}
                Below is a list of your work history.
              </p>
              <p className="text-[16px] leading-tight text-gray-600">
                {" "}
                By clicking on the pencil you will be able to edit.{" "}
              </p>
              <p className="text-[16px] leading-tight text-gray-600">
                {" "}
                Want to create a new Resume click on the black box.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full  mt-2 flex justify-center">
          <div className="grid grid-cols-3 w-[50%] ">
            {myResumes?.map((resume: ResumeType, i: number) => (
              <div key={i} className="flex mt-4 flex-col items-center">
                <div className="bg-white h-52 overflow-y-scroll flex justify-center overflow-hidden group items-center w-40 rounded-md text-gray-400 hover:text-gray-600 border-2 cursor-pointer border-gray-400 relative  transition-all duration-200 hover:border-gray-600 ">
                  <div className="absolute p-1  top-0 right-0 -translate-y-10 group-hover:translate-y-0 transition-all duration-300   w-full flex justify-end gap-2">
                    <MdDelete
                      onClick={() => {
                        deleteResume({
                          variables: {
                            resumeId: resume?._id,
                          },
                        });

                        dispatch(
                          setMyResumes(
                            myResumes.filter((res) => res?._id !== resume?._id)
                          )
                        );
                      }}
                      className="bg-red-400 text-white p-1 rounded-full text-2xl"
                    />
                    <MdModeEditOutline
                      onClick={() => {
                        navigate(`/resume/${resume?._id}/edit?page=1`);
                      }}
                      className="bg-blue-400 text-white p-1 rounded-full text-2xl"
                    />
                  </div>
                  <div>
                    <Template
                      formating={{
                        fontColor: "text-black",
                        fontFamily: "",
                        fontSize: 8,
                        headingSize: 6,
                        lineSpacing: 1,
                        paragraphSpreading: 1,
                        sectionSpacing: 0.2,
                        imageSize: 14,
                      }}
                      resume={resume}
                    />
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">Web Developer </div>
              </div>
            ))}
            <div
              onClick={() => {
                if (!createResume_loading) handleCreateResume();
              }}
              className="flex mt-4 flex-col items-center"
            >
              <div className="bg-white h-52 flex justify-center items-center w-40 rounded-md text-gray-400 hover:text-gray-600 border-2 cursor-pointer border-gray-400  transition-all duration-200 hover:border-gray-600 ">
                {!createResume_loading ? (
                  <IoIosAddCircle className=" text-4xl"></IoIosAddCircle>
                ) : (
                  <AiOutlineLoading3Quarters className=" text-3xl animate-spin text-pink-400"></AiOutlineLoading3Quarters>
                )}
              </div>
            </div>
            <div className="ml-auto"></div>
          </div>
        </div>
      </div>
    </LoginedProvider>
  );
};

export default Home;
