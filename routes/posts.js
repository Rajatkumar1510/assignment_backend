import express from "express";
import PostData from "../models/postData.js";
import auth from "../middleware/auth.js";
const router = express.Router();
// all posts
router.get("/", async (req, res) => {
  try {
    const Posts = await PostData.find();

    res.send(Posts);
  } catch (error) {
    console.log(error);
  }
});
// single post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostData.findById(id);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

// create a post
router.post("/", auth, async (req, res) => {
  const post = req.body;
  const newPost = new PostData({ ...post, name: req.userId });
  try {
    await newPost.save();
    res.send(newPost);
  } catch (error) {
    console.log(error);
  }
});

// delete a post
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  await PostData.findByIdAndDelete(id);
  res.send("Post deleted succesfully");
});
// edit a post
router.patch("/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  const updatedPost = await PostData.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
});
export default router;
