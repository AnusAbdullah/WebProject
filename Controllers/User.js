// Require the necessary modules and models
const user = require("../Model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Function to add a new user to the database
const addUser = catchAsyncErrors(async (req, res, next) => {
  // Get the user data from the request body
  const { fname, lname, email, password } = req.body;

  // Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // console.log(cname, cemail, cpassword, caddress);
  try {
    user.create({
      // Create a new user in the database with the hashed password
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    });

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    };
    // const response = await testing(fname, lname, email);
    // Send a response with the user data
    res.json({ data: data });
  } catch (err) {
    // If there's an error, send a response with an error message
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
});

// Function to sign in a user and generate a JWT token
const SignIn = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const User = await user.findOne({ where: { email: email } });
    if (!User) {
      // If the user doesn't exist, send an error response
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      // If the password is incorrect, send an error response
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If the user exists and the password is correct, generate a JWT token
    const token = jwt.sign({ id: User._id }, "mysecretkey", {
      expiresIn: "300s",
    });
    // Send the JWT token in the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Middleware function to validate a JWT token
const validateToken = catchAsyncErrors((req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // If there's no authorization header, send an error response
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get the JWT token from the authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the JWT token and get the user ID from the payload
    const decoded = jwt.verify(token, "mysecretkey");
    req.UserId = decoded.id;
    // Call the next middleware function
    next();
  } catch (error) {
    // If the token is invalid, send an error response
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

// Function to send a response indicating the user is authenticated
const Profile = catchAsyncErrors((req, res) => {
  res.json({ message: "You are authenticated!" });
});

const deleteUser = catchAsyncErrors((req, res, next) => {
  const { email } = req.body;

  user
    .destroy({
      where: { email: email },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with username=${email}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with username=" + email,
      });
    });
});

const updateUser = catchAsyncErrors((req, res, next) => {
  const { fname, lname, email, password } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  user
    .update(
      {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      },
      { where: { email: email } }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update User with username=${email}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update User with username=" + email,
      });
    });
});

const findUser = catchAsyncErrors((req, res, next) => {
  const { id } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  user
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with username=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with username=" + email,
      });
    });
});

const allUser = catchAsyncErrors((req, res, next) => {
  // const { id } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  user
    .findAll()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Users`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Users",
      });
    });
});

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  findUser,
  SignIn,
  Profile,
  validateToken,
  allUser,
};
