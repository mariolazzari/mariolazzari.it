import mongoose, { Schema, Document, Model } from "mongoose";

interface ICertification extends Document {
  title: string;
  date: string;
  url: string;
  imagePath: string;
}

const CertificationSchema: Schema<ICertification> = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    url: { type: String, required: true },
    imagePath: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "certifications",
  }
);

export const Certification: Model<ICertification> =
  mongoose.models.Certification ||
  mongoose.model<ICertification>("Certification", CertificationSchema);
