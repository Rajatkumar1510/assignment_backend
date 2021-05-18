import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String },
  name: { type: String },
  password: { type: String },
  id: { type: String },
});

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
