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
const hpp = require("hpp");
const helmet = require("helmet");

const prod = process.env.NODE_ENV == "production";

dotenv.config();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: "https://pastweathercrawler.tk",
      credentials: true
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
}
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
      secure: false,
      domain: prod && ".pastweathercrawler.tk"
    },
    name: "fpqkda"
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userAPIRouter);
app.use("/api/card", cardAPIRouter);

app.get("/", (req, res) => {
  res.status(200).send("run!");
});

app.listen(prod ? process.env.PORT : 8080, () => {
  console.log("server~~~~run~~~Yea~~");
});
