// Library
import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema
const reviewSchema = new Schema(
  {
    serviceId: {
      type: String,
      default: true,
    },
    userId: {
      type: String,
      default: true,
    },
    star: {
      type: Number,
      default: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("review", reviewSchema);
