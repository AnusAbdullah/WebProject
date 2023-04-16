const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const sequelize = require("./DB/Connection");
const userRoute = require("./Routes/User");
const adminRoute = require("./Routes/Admin");
const booksRoute = require("./Routes/Books");
const u_reviewsRoute = require("./Routes/U_Reviews");
const commentsRoute = require("./Routes/Comments");
const postRoute = require("./Routes/Posts");
const path = require("path");
const bodyParser = require("body-parser");
const notfound = require("./middlewares/notfound");
const user = require("./Model/User");
const books = require("./Model/Books");
const u_reviews = require("./Model/U_Reviews");
const comments = require("./Model/Comments");
const posts = require("./Model/Posts");
user.hasMany(posts);
u_reviews.belongsTo(posts);
posts.hasMany(comments);
books.hasMany(u_reviews);
app.set("view engine", "ejs"); // set the view engine to ejs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use([express.json(), express.static('./public')]);
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/books", booksRoute);
app.use("/u_reviews", u_reviewsRoute);
app.use("/comments", commentsRoute);
app.use("/posts", postRoute);
app.use("*", notfound);

const port = 5000;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to db...");
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
