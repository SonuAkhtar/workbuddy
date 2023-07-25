// Library
import express from "express";

// Modules
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:serviceId", getReviews);
router.delete("/delete/:id", deleteReview);

export default router;
