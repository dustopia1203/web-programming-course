const express = require("express");
const router = express.Router();
const Users = require("../db/userModel");
const sendToken = require("../helpers/jwt");
const isAuthenticated = require("../middlewares/auth");

router.post("/login", async (req, res, next) => {
  const { login_name, password } = req.body;
  if (!login_name || !password) {
    return res.status(400).json({ message: "Missing login information" });
  }
  const user = await Users.findOne({ login_name, password });
  if (!user) {
    return res.status(404).json({ message: "Not valid login information" });
  }
  sendToken(user, 200, res);
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logged out",
  });
});

router.get("/me", isAuthenticated, async (req, res, next) => {
  res.status(200).json(req.user);
});

router.post("/register", async (req, res, next) => {
  const {
    first_name,
    last_name,
    login_name,
    password,
    location,
    description,
    occupation,
  } = req.body;
  if (!first_name || !last_name || !login_name || !password) {
    return res
      .status(400)
      .json({ message: "Missing registration information" });
  }
  const user = await Users.findOne({ login_name });
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }
  const newUser = new Users({
    first_name,
    last_name,
    login_name,
    password,
    location,
    description,
    occupation,
  });
  await newUser.save();
  res.status(200).json({ message: "User created" });
});

module.exports = router;
