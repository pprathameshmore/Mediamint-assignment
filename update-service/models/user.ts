import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: mongoose.Schema.Types.String,
      enum: ["female", "male"],
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: ["active", "inactive"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
