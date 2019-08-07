const passport = require("passport");
const local = require("./local");
const db = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        include: [
          {
            model: db.Card,
            as: "Cards",
            attritubes: ["userId"],
            limit: 3,
            order: [["createdAt", "DESC"]]
          }
        ]
      });
      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e);
    }
  });
  local();
};
