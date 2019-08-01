const express = require("express");
const userAPIRouter = require("./routes/user");
const cardAPIRouter = require("./routes/card");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const app = express();

db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/user", userAPIRouter);
app.use("/api/card", cardAPIRouter);

app.listen(8080, () => {
  console.log("server~~~~run~~~Yea~~");
});
