import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPost
} from "../controller/postControlller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../utils/config/multer.js";

const router = express.Router();

router.get("/feed", protectRoute,getFeedPost);
router.get("/:id", getPost);
router.post("/create",upload.single('img'), protectRoute, createPost);
router.delete("/:id", protectRoute,deletePost);
router.put("/like/:id", protectRoute,likeUnlikePost);
router.put("/reply/:id", protectRoute,replyToPost);

export default router;
