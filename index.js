const express = require("express");
const userAPIRouter = require("./routes/user");
const cardAPIRouter = require("./routes/card");
const db = require("./models");
const app = express();

db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userAPIRouter);
app.use("/api/card", cardAPIRouter);

app.listen(8000, () => {
  console.log("server~~~~run~~~Yea~~");
});
