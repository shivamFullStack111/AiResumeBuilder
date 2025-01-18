import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { ResumeType } from "../editPage1/WorkExperience";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import TemplateProvider from "../../TemplateProvider";
import { defaultFormating, UPDATE_RESUME } from "../../utils";

interface Props {
  resume: ResumeType | null;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: {
    country: string;
    state: string;
    pincode: string;
  };
}

const BasicDetails: React.FC<Props> = ({ resume }) => {
  const navigate = useNavigate();
  const [updateResumeInBackend, { error }] = useLazyQuery(UPDATE_RESUME);
  const [personalInfo, setpersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: {
      country: "",
      state: "",
      pincode: "",
    },
  });
  const dispatch = useAppDispatch();

  // setresume to usestate
  useEffect(() => {
    if (resume) {
      setpersonalInfo({
        firstName: resume?.personalInfo?.fullName?.split("-")[0] || "",
        lastName: resume?.personalInfo?.fullName?.split("-")[1] || "",
        phone: resume?.personalInfo?.phone || "",
        email: resume?.personalInfo?.email || "",
        address: {
          country: resume?.personalInfo?.address?.country || "",
          state: resume?.personalInfo?.address?.state || "",
          pincode: resume?.personalInfo?.address?.pincode || "",
        },
      });
    }
  }, [resume]);

  const handleContinue = () => {
    updateResumeInBackend({
      variables: {
        resumeData: {
          personalInfo: {
            fullName: personalInfo?.firstName + "-" + personalInfo?.lastName,
            phone: personalInfo?.phone,
            email: personalInfo?.email,
            address: personalInfo?.address,
          },
          currentPath: window.location.href,
        },
        resumeid: resume?._id,
      },
    });

    if (!error) {
      dispatch(
        updateResume({
          personalInfo: {
            ...personalInfo,
            fullName: personalInfo?.firstName + "-" + personalInfo?.lastName,
          },
          currentPath: window.location.href,
        })
      );
    }

    navigate("?page=4&templateid=ghfh457t88ygurhg&edit=experience-details");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5   grid-cols-6 gap-5 ">
          <div className="col-span-4 w-full    h-full ">
            <h3 className="mt-16 font-bold text-3xl text-slate-800">
              Let’s start with your header
            </h3>
            <p className="mt-2">
              Include your full name and at least one way for employers to reach
              you.
            </p>
            <div className="mt-5 flex gap-3 items-center">
              <img
                src={"/logo5.png"}
                alt="user"
                className="w-24 h-28 border-dashed border border-gray-500"
              ></img>
              <div className="flex text-[12px] flex-col justify-center">
                <p>Add a photo to your resume</p>
                <button
                  type="button"
                  className="py-2 bg-pink-400 text-white text-sm hover:bg-pink-500 mt-1 px-10 rounded-3xl"
                >
                  Add a photo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5  w-full">
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({ ...p, firstName: e.target.value }));
                }}
                value={personalInfo?.firstName}
                autofocus
                title="name"
                placeholder="Enter your name"
              ></CustomInput>
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({ ...p, lastName: e.target.value }));
                }}
                value={personalInfo?.lastName}
                title="last name"
                placeholder="Enter your last name"
              ></CustomInput>
            </div>
            <div className="grid mt-5 grid-cols-2 gap-4  w-full">
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({
                    ...p,
                    address: {
                      ...p?.address,
                      state: e.target.value,
                    },
                  }));
                }}
                value={personalInfo?.address?.state}
                title="state"
                placeholder="Enter your state "
              ></CustomInput>
              <div className="flex gap-5">
                <CustomInput
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setpersonalInfo((p) => ({
                      ...p,
                      address: {
                        ...p?.address,
                        country: e.target.value,
                      },
                    }));
                  }}
                  value={personalInfo?.address?.country}
                  title="country"
                  placeholder="Enter your country "
                ></CustomInput>{" "}
                <CustomInput
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setpersonalInfo((p) => ({
                      ...p,
                      address: {
                        ...p?.address,
                        pincode: e.target.value,
                      },
                    }));
                  }}
                  value={personalInfo?.address?.pincode}
                  type="number"
                  title="pincode"
                  placeholder="Enter pincode"
                ></CustomInput>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5  w-full">
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({
                    ...p,
                    phone: e.target.value,
                  }));
                }}
                value={personalInfo?.phone}
                title="phone number"
                type="number"
                placeholder="Enter your phone number"
              ></CustomInput>
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({ ...p, email: e.target.value }));
                }}
                value={personalInfo?.email}
                title="email"
                type="email"
                placeholder="Enter your email address"
              ></CustomInput>
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
          <div className="col-span-2 pt-8 w-full h-full max-h-screen overflow-y-scroll hide ">
            <TemplateProvider formating={defaultFormating} resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
