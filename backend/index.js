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

dotenv.config();

db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.set("trust proxy", 1);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userAPIRouter);
app.use("/api/card", cardAPIRouter);

app.listen(8080, () => {
  console.log("server~~~~run~~~Yea~~");
});
