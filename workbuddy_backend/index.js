//libraries
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes
import authRoute from "./routes/auth.route.js";
import conversationRoute from "./routes/conversation.route.js";
import serviceRoute from "./routes/service.route.js";
import messageRoute from "./routes/message.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import userRoute from "./routes/user.route.js";

const PORT = process.env.PORT || 8800;

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({ origin: "https://workbuddy-flame.vercel.app", credentials: true })
);
app.use(express.json());
app.use(cookieParser());

// use routes
app.use("/auth", authRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/orders", orderRoute);
app.use("/reviews", reviewRoute);
app.use("/services", serviceRoute);
app.use("/users", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Backend Running");
});
