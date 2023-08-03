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
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

const corsOptions = {
  origin: "https://workbuddy-flame.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());

// use routes
app.use("/auth", cors(corsOptions), authRoute);
app.use("/conversations", cors(corsOptions), conversationRoute);
app.use("/services", cors(corsOptions), serviceRoute);
app.use("/messages", cors(corsOptions), messageRoute);
app.use("/orders", cors(corsOptions), orderRoute);
app.use("/reviews", cors(corsOptions), reviewRoute);
app.use("/users", cors(corsOptions), userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Listening to backend");
});
