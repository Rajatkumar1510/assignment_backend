import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserData from "../models/userData.js";
const secret = "naruto";
const router = express.Router();
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserData.findOne({ email });
    if (!oldUser) return res.json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.json({ message: "Invalid password" });
    // if the user exist and password is correct then we get their jsonwebtoken to frontend
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    // res.send({ result: oldUser, token });
    res.json({ result: oldUser, token });
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
});
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const oldUser = await UserData.findOne({ email });
    if (oldUser) return res.json({ message: "User already exist" });
    const encryptedPassword = await bcrypt.hash(password, 12);
    // The second argument in hash is salt it is the level of difficulty to hash password
    const result = await UserData.create({
      email,
      password: encryptedPassword,
      name,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    // res.send({ result: oldUser, token });
    res.json({ result, token });
    console.log(token);
  } catch (error) {
    res.send(error);
  }
});

export default router;
