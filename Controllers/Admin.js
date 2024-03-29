const admin = require("../Model/Admin.js");

const addAdmin = (req, res, next) => {
    const { id,name,email,password } =
      req.body;
  
    admin
      .create({
        id: id,
        name: name,
        email: email,
        password: password
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the new admin.",
        });
      });
};

const updateAdmin = (req, res, next) => {
    const { id,name,email,password } =
      req.body;
  
    admin
      .update(
        {
            id: id,
            name: name,
            email: email,
            password: password
        },
        { where: { id: id } }
      )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Admin was updated successfully!",
          });
        } else {
          res.send({
            message: `Cannot update Admin with id=${id}. Admin was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not update Admin with id=" + id,
        });
      });
};

const deleteAdmin = (req, res, next) => {
    const { id } = req.body;
  
    admin
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Admin was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Admin with id=${id}. Admin was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Admin with id=" + id,
        });
      });
  };

  const findAdmin = (req, res, next) => {
    const { id } = req.body;
    admin
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Admin with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Admin with id=" + id,
        });
      });
  };
  
  module.exports = {
    findAdmin,
    deleteAdmin,
    updateAdmin,
    addAdmin,
  };
  