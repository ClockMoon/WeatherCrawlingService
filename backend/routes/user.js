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
    const alreadyExistUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (alreadyExistUser) {
      return res.status(403).send("아이디 있음.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      userId: req.body.userId,
      password: hashedPassword
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.put("/", async (req, res) => {});

router.delete("/", async (req, res) => {});

module.exports = router;
