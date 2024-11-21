import mongoose, { Schema, Document } from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    datetime: { type: Date, required: true },
    tag: { type: String },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);