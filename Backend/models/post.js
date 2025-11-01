import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  section: {
    type: String,
    enum: ["sad", "like", "shock", "angry", "hope", "inspire"],
    required: true,
  },
  reactions: {
    sad: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    shock: { type: Number, default: 0 },
    angry: { type: Number, default: 0 },
    hope: { type: Number, default: 0 },
    inspire: { type: Number, default: 0 },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
