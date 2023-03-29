const user = require("../Model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUser = async (req, res, next) => {
  const { fname, lname, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // console.log(cname, cemail, cpassword, caddress);
  try {
    user.create({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    });
    res.send({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: User._id }, "mysecretkey", {
      expiresIn: "300s",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "mysecretkey");
    req.UserId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const Profile = (req, res) => {
  res.json({ message: "You are authenticated!" });
};

const deleteUser = (req, res, next) => {
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
};

const updateUser = (req, res, next) => {
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
};

const findUser = (req, res, next) => {
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
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  findUser,
  SignIn,
  Profile,
  validateToken,
};
