import multer from "multer";
import express from "express";
import path from "path";
import {
  addFood,
  foodList,
  removeFood,
} from "../controllers/foodController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", foodList);
router.post("/remove", removeFood);

export default router;
