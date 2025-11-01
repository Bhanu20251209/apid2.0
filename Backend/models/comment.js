import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  text: { type: String, required: true },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  time: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);
