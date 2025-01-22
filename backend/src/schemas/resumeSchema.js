const mongoose = require("mongoose");

// Define the schema
const resumeSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    onStep: {
      type: Number,
      default: 1,
    },
    currentPath: {
      type: String,
    },
    imageUrl: String,
    templateData: {
      templateid: String,
      color: String,
      withPhotos: Boolean,
      withGraphics: Boolean,
      columns: Number,
    },
    links: [
      {
        type: String,
      },
    ],
    targetCountry: {
      type: String,
    },
    experience: {
      type: String,
      enum: ["no experience", "entry-level", "mid-level", "senior"],
    },
    personalInfo: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      address: {
        pincode: { type: String },
        state: { type: String },
        country: { type: String },
      },
      linkedin: { type: String },
      portfolio: { type: String },
    },
    professionalSummary: { type: String }, // Short career summary
    workExperience: [
      {
        jobTitle: { type: String },
        companyName: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        location: { type: String },
        responsibilities: String,
        currentlyWorking: { type: Boolean },
      },
    ],
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        endDate: { type: Date },
        otherCourses: [{ type: String }],
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    projects: [
      {
        title: { type: String },
        description: { type: String },
        technologies: [String],
        link: { type: String },
      },
    ],
    certifications: [
      {
        name: { type: String },
        issuingOrganization: { type: String },
        issueDate: { type: Date },
      },
    ],
    achievements: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    languages: [
      {
        name: { type: String },
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Fluent"],
        },
      },
    ],
    hobbies: [String], // e.g., Reading, Traveling
    references: [
      {
        name: { type: String },
        contact: { type: String },
        relationship: { type: String },
      },
    ],
    socialLinks: {
      github: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      dribbble: { type: String },
      behance: { type: String },
    },
    customSections: [
      {
        heading: String,
        summary: String,
      },
    ],
    volunteerExperience: [
      {
        organization: { type: String },
        role: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    createdAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);

// Create the model

const Resumes = mongoose.model("Resumes", resumeSchema);

module.exports = { Resumes };
