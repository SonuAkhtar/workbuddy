// Library
import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema
const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);
