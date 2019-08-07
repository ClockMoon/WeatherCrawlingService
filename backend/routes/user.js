const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");
const passport = require("passport");

router.get("/", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Is Not Login");
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Card,
              as: "Cards",
              limit: 3,
              order: [["createdAt", "DESC"]]
            }
          ],
          attributes: ["userId"]
        });
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).send("logout 성공");
});

module.exports = router;
