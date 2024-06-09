import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile
} from "../controller/userContorller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../utils/config/multer.js";

const router = express.Router();

router.get('/profile/:query', getUserProfile)
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute,followUnFollowUser);
router.put("/update/:id",upload.single('profilePict'), protectRoute, updateUser);

//login
//update profile

export default router;
