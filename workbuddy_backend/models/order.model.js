// Library
import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema
const orderSchema = new Schema(
  {
    serviceId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: true,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
