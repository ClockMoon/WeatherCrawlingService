const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  res.send("user");
  return res.status(200);
});

router.post("/", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;
    const alreadyExistUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (alreadyExistUser) {
      const checkPassword = await bcrypt.compare(
        password,
        alreadyExistUser.password
      );
      if (checkPassword) {
        req.session.userId = userId;
        return res.status(200).json(alreadyExistUser.userId);
      } else return res.status(403);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.User.create({
      userId,
      password: hashedPassword
    });
    req.session.userId = userId;
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.put("/", async (req, res) => {});

router.delete("/", async (req, res) => {});

module.exports = router;
