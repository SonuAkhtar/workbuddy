// Library
import express from "express";

// Modules
import { verifyToken } from "../middleware/jwt.js";
import {
  getAllServices,
  getSingleService,
  createService,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/single/:id", getSingleService);
router.post("/", verifyToken, createService);
router.delete("/:id", verifyToken, deleteService);

export default router;
