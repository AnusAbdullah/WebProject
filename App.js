const express = require("express");
const app = express();
const userRoute = require("./Routes/User");
const adminRoute = require("./Routes/Admin");
const booksRoute = require("./Routes/Books");
const u_reviewsRoute = require("./Routes/U_Reviews");
const commentsRoute = require("./Routes/Comments");

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/books", booksRoute);
app.use("/u_reviews", u_reviewsRoute);
app.use("/comments", commentsRoute);
app.listen("3000");
