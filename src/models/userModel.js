import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "please provide an email"], unique: true },
  username: { type: String, required: [true , " please provide an username"], unique: true },
  password: { type: String, required: [true , " please provide a password"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: { type: String, default: "" },
  forgotPasswordTokenExpiry: { type: Date, default: null },
  verifyToken: { type: String, default: "" },
  verifyTokenExpiry: { type: Date, default: null },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;