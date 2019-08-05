const passport = require("passport");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await db.User.findOne({
        where: { userId }
      });
      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e);
    }
  });
};
