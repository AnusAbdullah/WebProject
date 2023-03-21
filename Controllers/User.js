const user = require("../Model/User.js");

const addUser = (req, res, next) => {
  const { id, fname, lname, email, password } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  user
    .create({
      id: id,
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });

  //   console.log("User created");
  //   res.render("login-signin", { data: "sign-up successfully" });

  // } catch (error) {
  //   // console.log(error);
  // //   res.render("login-signin", { data: "email already exist" });
  // }
};

const deleteUser = (req, res, next) => {
  const { id } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  user
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

const updateUser = (req, res, next) => {
  const { id, fname, lname, email, password } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  user
    .update(
      {
        id: id,
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      },
      { where: { id: id } }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update User with id=" + id,
      });
    });
  //   console.log("User created");
  //   res.render("login-signin", { data: "sign-up successfully" });

  // } catch (error) {
  //   // console.log(error);
  // //   res.render("login-signin", { data: "email already exist" });
  // }
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
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    }); //   console.log("User created");
  //   res.render("login-signin", { data: "sign-up successfully" });

  // } catch (error) {
  //   // console.log(error);
  // //   res.render("login-signin", { data: "email already exist" });
  // }
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  findUser,
};
