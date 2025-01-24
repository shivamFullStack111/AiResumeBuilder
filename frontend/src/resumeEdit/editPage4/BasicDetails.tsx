import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { ResumeType } from "../editPage1/WorkExperience";
import { useLazyQuery } from "@apollo/client";
import { RootState, useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";
import TemplateProvider from "../../TemplateProvider";
import { backendUrl, UPDATE_RESUME } from "../../utils";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { MdOutlinePreview } from "react-icons/md";

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
  const { user } = useUser();
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
  const { formating } = useSelector((state: RootState) => state.resume);
  const [image, setimage] = useState<File | undefined>(undefined);
  const [previewOpen, setpreviewOpen] = useState(false);
  const [imageUploading, setimageUploading] = useState(false);

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

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    if (resume?.experience == "no experience")
      navigate(`?page=4&templateid=${resume?._id}&edit=education-details`);
    else navigate(`?page=4&templateid=${resume?._id}&edit=experience-details`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] ">
        <div className="grid w-full bg-white mt-5   grid-cols-1 800px:grid-cols-6   gap-5 ">
          <form
            onSubmit={handleContinue}
            className="col-span-6 1200px:col-span-4 w-full    h-full "
          >
            <h3 className="mt-6 600px:mt-10 1200px:mt-16 font-bold text-xl 600px:text-2xl 1200px:text-3xl text-slate-800">
              Let’s start with your header
            </h3>
            <p className="mt-2 text-sm 600px:text-lg 1200px:text-xl">
              Include your full name and at least one way for employers to reach
              you.
            </p>

            <div>
              <MdOutlinePreview
                onClick={() => setpreviewOpen(true)}
                className="text-[40px] p-2 mt-4 bg-green-500 text-white rounded-md ml-auto  1200px:hidden"
              ></MdOutlinePreview>
            </div>
            {resume?.templateData?.withPhotos && (
              <div className="mt-5 flex gap-3 items-center">
                <div className=" w-16 h-20 1200px:w-24 1200px:h-28 border-dashed border flex justify-center items-center border-gray-500">
                  {imageUploading ? (
                    <p className="text-[10px] font-semibold text-blue-500">
                      Uploading...
                    </p>
                  ) : (
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : resume?.imageUrl
                          ? resume?.imageUrl
                          : "/logo5.png"
                      }
                      className="w-full h-full"
                      alt="user"
                    ></img>
                  )}
                </div>

                <div className="flex text-[12px] flex-col justify-center">
                  <p>Add a photo to your resume</p>
                  <input
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      setimageUploading(true);
                      if (e?.target?.files) {
                        setimage(e?.target?.files[0]);
                        const formData = new FormData();
                        formData.append("file", e.target?.files[0]);
                        if (resume?._id) {
                          formData.append("resumeId", resume?._id);
                        }
                        if (user?.primaryEmailAddress?.emailAddress) {
                          formData.append(
                            "userEmail",
                            user.primaryEmailAddress.emailAddress
                          );
                        }

                        const res = await axios.post(
                          backendUrl + "/upload-image",
                          formData
                        );
                        if (res.data?.success) {
                          dispatch(
                            updateResume({ imageUrl: res.data?.imageUrl })
                          );
                        }
                        setimageUploading(false);
                      }
                      setimageUploading(false);
                    }}
                    id="image"
                    placeholder="Your image"
                    type="file"
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="py-2 cursor-pointer bg-pink-400 text-white text-sm hover:bg-pink-500 mt-1 px-10 rounded-3xl"
                  >
                    Add a photo
                  </label>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 800px:grid-cols-2 mt-4 gap-5  w-full">
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({ ...p, firstName: e.target.value }));
                }}
                value={personalInfo?.firstName}
                autofocus
                title="name"
                required={true}
                placeholder="Enter your name"
              ></CustomInput>
              <CustomInput
                onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpersonalInfo((p) => ({ ...p, lastName: e.target.value }));
                }}
                required
                value={personalInfo?.lastName}
                title="last name"
                placeholder="Enter your last name"
              ></CustomInput>
            </div>
            <div className="grid mt-5 grid-cols-1 800px:grid-cols-2 gap-4  w-full">
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
                required
                value={personalInfo?.address?.state}
                title="state"
                placeholder="Enter your state "
              ></CustomInput>
              <div className="800px:flex  gap-5">
                <CustomInput
                  required
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
                  containerClassName="max-800px:mt-3"
                  required
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
            <div className="grid grid-cols-1 800px:grid-cols-2 gap-5 mt-5  w-full">
              <CustomInput
                required
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
                required
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
                className="px-10 1200px:px-16 rounded-3xl hover:bg-gray-200 cursor-pointer border-2 border-black font-semibold py-2"
              >
                Back
              </div>
              <button
                type="submit"
                className="px-16 rounded-3xl bg-blue-500  hover:bg-blue-600 cursor-pointer text-white font-semibold py-2"
              >
                Continue
              </button>
            </div>
          </form>
          {previewOpen && (
            <div
              onClick={() => setpreviewOpen(false)}
              className="absolute 1200px:hidden h-full w-full bg-[#00000044] top-0 left-0 flex justify-center items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[430px] px-4"
              >
                <TemplateProvider formating={formating} resume={resume} />
              </div>
            </div>
          )}
          <div className="col-span-2 max-1200px:hidden pt-8 w-full h-full max-h-screen 1200px:overflow-y-scroll hide ">
            <TemplateProvider formating={formating} resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
