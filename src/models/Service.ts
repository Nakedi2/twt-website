import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  subcategories: { name: string; description: string }[];
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: { type: [String], default: [] },
    subcategories: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ServiceSchema.index({ order: 1 });

export default mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);
