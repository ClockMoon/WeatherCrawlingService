const express = require("express");
const userAPIRouter = require("./routes/user");
const cardAPIRouter = require("./routes/card");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport");

dotenv.config();
db.sequelize.sync();
passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    key: "sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    },
    name: "fpqkda"
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userAPIRouter);
app.use("/api/card", cardAPIRouter);

app.listen(8080, () => {
  console.log("server~~~~run~~~Yea~~");
});
