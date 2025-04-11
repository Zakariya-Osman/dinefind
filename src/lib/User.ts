import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  hashedPassword: String,
  role: { type: String, default: "user" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
