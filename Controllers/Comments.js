const cmnts = require("../Model/Comments.js");
const addCmnts = (req, res, next) => {
    const { id,comment,u_id } =
      req.body;
  
    cmnts
      .create({
        id: id,
        comment: comment,
        u_id: u_id
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating new comment.",
        });
      });
};

const updateCmnts = (req, res, next) => {
    const { id,comment,u_id } =
      req.body;
  
    cmnts
      .update(
        {
            id: id,
            comment: comment,
            u_id: u_id
        },
        { where: { id: id } }
      )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Comment was updated successfully!",
          });
        } else {
          res.send({
            message: `Cannot update Comment with id=${id}. Admin was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not update Comment with id=" + id,
        });
      });
};

const deleteCmnts = (req, res, next) => {
    const { id } = req.body;
  
    cmnts
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Comment was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Comment with id=${id}. Comment was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Comment with id=" + id,
        });
      });
  };

  const findCmnts = (req, res, next) => {
    const { id } = req.body;
    cmnts
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Comment with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Comment with id=" + id,
        });
      });
  };

module.exports = {
    findCmnts,
    deleteCmnts,
    updateCmnts,
    addCmnts
}