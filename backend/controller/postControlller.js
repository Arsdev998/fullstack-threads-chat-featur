import User from "../models/UserModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
  try {
    const { postBy, caption, img } = req.body;

    if (!postBy || !caption) {
      return res
        .status(400)
        .json({ message: "postBy and caption fields are required" });
    }

    const user = await User.findById(postBy);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to create post" });
    }

    const maxLength = 600;
    if (caption.length > maxLength) {
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxLength} characters` });
    }

    const newPost = new Post({ postBy, caption, img });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error creating post: ", error.message);
  }
};

export { createPost };
