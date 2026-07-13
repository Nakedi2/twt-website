import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: { type: String },
    social: {
      linkedin: { type: String },
      twitter: { type: String },
      github: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
