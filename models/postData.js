import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  name: String,
  message: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const PostData = mongoose.model("PostData", postSchema);

export default PostData;
