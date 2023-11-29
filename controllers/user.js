import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config.js";
import verifyToken from "../middleware/verifyToken.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send({ user });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const password = hashpassword;
    const { name, email } = req.body;

    const user = await User({
      name: name,
      email: email,
      password: password,
    });
    user.save();
    return res.status(200).send({ msg: "success", user });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).then((res) =>
      res.toObject()
    );
    if (!user) {
      return res.status(401).send({ err: "not found" });
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.status(403).send({ err: "not match" });
    }
    delete user.password;
    const token = Jwt.sign({ user }, `usmanbey`);
    const cooktoken = res.cookie("token", token);
    const success = res.status(200).send({ msg: "success", user, token });
    return { cooktoken, success };
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.put("/update", async (req, res) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const password = hashpassword;
    const users = await User.findOne({ _id: req.body.id });
    await users.updateOne({ id: req.body.id, password: password });
    const compare = await bcrypt.compare(req.body.password, password);
    return res.status(200).send({ msg: "Success", users, compare });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
});

export default router;
