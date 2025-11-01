import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
    enum: ["VIT-AP University", "SRM University", "NRI University", "Other"],
  },
  role: {
    type: String,
    enum: ["superadmin", "moderator", "counselor"],
    default: "moderator",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare entered password with stored hash
adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
