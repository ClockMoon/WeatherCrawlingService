const passport = require("passport");

const { Strategy: LocalStrategy } = require("passport-local");

const bcrypt = require("bcrypt");

const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password"
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({
            where: {
              userId
            }
          });

          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await db.User.create({
              userId,
              password: hashedPassword
            });
            return done(null, newUser);
          }

          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reaseon: "비밀번호가 틀립니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
