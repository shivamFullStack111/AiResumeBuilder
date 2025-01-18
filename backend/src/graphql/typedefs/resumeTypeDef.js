const resumeTypeDef = `
 

type Resume {
  _id: ID
  templateData:TemplateData
  experience:String
  userEmail: String
  skills: [String]
  currentPath:String
  onStep:Int
  hobbies: [String]
  workExperience: [WorkExperience]
  education: [Education]
  projects: [String]
  certifications: [String]
  achievements: [String]
  languages: [LanguagesType]
  references: [String]
  volunteerExperience: [String]
  createdAt: String
  updatedAt: String
  targetCountry:String
  personalInfo : PersonalInfo
  professionalSummary : String
  links: [String]
  customSections:[CustomSectionType]
}

type LanguagesType {
  name:String
  proficiency: String
}
input LanguagesInput {
  name:String
  proficiency: String
}
type CustomSectionType {
  heading : String
  summary : String
}
input CustomSectionInput {
  heading : String
  summary : String
}
type PersonalInfo {
   fullName:String
   email:String
   phone:String
   address:Address
   linkedin:String
   portfolio:String
}

type Education  {
    degree: String
    institution: String
    startDate: String
    endDate: String
    otherCourses: [String]
  } 
input EducationInput  {
    degree: String
    institution: String
    startDate: String
    endDate: String
    otherCourses: [String]
  } 

type WorkExperience {
    jobTitle: String
    companyName: String
    startDate: String
    endDate: String
    location: String
    responsibilities: String
    currentlyWorking: Boolean
}
input WorkExperienceInput {
    jobTitle: String
    companyName: String
    startDate: String
    endDate: String
    location: String
    responsibilities: String
    currentlyWorking: Boolean
}

input PersonalInfoInput {
   fullName:String
   email:String
   phone:String
   address:AddressInput
   linkedin:String
   portfolio:String
}

type Address {
  pincode:String
  state:String
  country:String
}
input AddressInput {
  pincode:String
  state:String
  country:String
}



type TemplateData {
  templateid:String
  color:String
}

input TemplateDataInput {
  templateid:String
  color:String
}

input ResumeInput {
  templateData:TemplateDataInput
  _id:ID
  currentPath:String
  experience:String
  userEmail: String
  skills: [String]
  onStep:Int
  hobbies: [String]
  workExperience: [WorkExperienceInput]
  education: [EducationInput]
  projects: [String]
  certifications: [String]
  achievements: [String]
  languages:[LanguagesInput]
  references: [String]
  volunteerExperience: [String]
  targetCountry:String
  personalInfo : PersonalInfoInput
  professionalSummary : String
  links: [String]
  customSections:[CustomSectionInput]
}



type Mutation {
  createResume(userEmail:String):Resume
}

type Success{
  success:Boolean
}

type Query {
  getResume(resumeid:String):Resume
  updateResume(resumeData:ResumeInput,resumeid:String):Resume
  getUserAllResumes(userEmail:String):[Resume]
  deleteResume(resumeId:ID):Success
}
`;

module.exports = { resumeTypeDef };
