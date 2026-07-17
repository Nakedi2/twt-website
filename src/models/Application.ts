import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  name: string;
  email: string;
  phone?: string;
  position: string;
  coverLetter: string;
  cvFileName?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    position: { type: String, required: true },
    coverLetter: { type: String, required: true },
    cvFileName: { type: String },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ status: 1, createdAt: -1 });
ApplicationSchema.index({ position: 1 });

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
