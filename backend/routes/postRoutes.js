import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost
} from "../controller/postControlller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute,deletePost);
router.post("/like/:id", protectRoute,likeUnlikePost);

export default router;
