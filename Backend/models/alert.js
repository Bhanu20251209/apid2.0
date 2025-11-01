import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null, // In case AI can't identify the student yet
  },
  userMessage: {
    type: String,
    required: true, // What the user said
  },
  analysis: {
    anxiety: {
      level: { type: String },
      probability: { type: Number },
    },
    depression: {
      level: { type: String },
      probability: { type: Number },
    },
    suicide_risk: {
      level: { type: String },
      probability: { type: Number },
    },
    message: { type: String }, // AI’s comforting/supportive message
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["unresolved", "reviewed", "resolved"],
    default: "unresolved",
  },
});

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
