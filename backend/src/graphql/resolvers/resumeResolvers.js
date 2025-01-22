const { Resumes } = require("../../schemas/resumeSchema");
const { Users } = require("../../schemas/userSchema");

const resumeResolver = {
  Mutation: {
    createResume: async (_, { userEmail }) => {
      const user = await Users.findOne({ email: userEmail });

      if (!user) {
        throw new Error(`${userEmail} does not exist`);
      }

      if (user.creadits == 0) {
        throw new Error(`You have no creadits`);
      }

      user.creadits -= 1;

      const resume = new Resumes({
        userEmail,
      });

      await resume.save();
      await user.save();

      return resume;
    },
  },
  Query: {
    getResume: async (_, { resumeid }) => {
      const resume = await Resumes.findOne({ _id: resumeid });

      if (!resume) {
        throw new Error("Resume not found");
      }

      return {
        ...resume.toObject(),
        skills: resume.skills || {
          technical: [],
          softSkills: [],
        },
        hobbies: resume.hobbies || [],
        workExperience: resume.workExperience || [],
        education: resume.education || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        achievements: resume.achievements || [],
        languages: resume.languages || [],
        references: resume.references || [],
        volunteerExperience: resume.volunteerExperience || [],
      };
    },
    updateResume: async (_, { resumeData, resumeid }) => {
      const resume = await Resumes.findOneAndUpdate(
        { _id: resumeid },
        { $set: resumeData },
        { new: true }
      );
      return resume;
    },
    getUserAllResumes: async (_, { userEmail }) => {
      return await Resumes.find({ userEmail });
    },
    deleteResume: async (_, { resumeId }) => {
      await Resumes.findByIdAndDelete(resumeId);
      return { success: true };
    },
  },
};

module.exports = { resumeResolver };
