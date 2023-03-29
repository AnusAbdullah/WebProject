const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const sequelize = require("./DB/Connection");
const userRoute = require("./Routes/User");
const adminRoute = require("./Routes/Admin");
const booksRoute = require("./Routes/Books");
const u_reviewsRoute = require("./Routes/U_Reviews");
const commentsRoute = require("./Routes/Comments");
const path = require("path");
const bodyParser = require("body-parser");

app.set("view engine", "ejs"); // set the view engine to ejs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/books", booksRoute);
app.use("/u_reviews", u_reviewsRoute);
app.use("/comments", commentsRoute);

const port = 5000;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to db...");
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
