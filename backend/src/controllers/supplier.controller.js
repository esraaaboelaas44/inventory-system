const fs = require("fs");
const { SupplierModel } = require("../models/Supplier.model");

const getSupplier = (req, res) => {
  SupplierModel.find()
    .then((supplier) => {
      res
        .status(200)
        .json({ msg: "Supplier fetched successfully", data: supplier });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("suppliers not fetched. Try again later");
    });
};

function addSupplier(req, res) {
  const jsData = req.body;
  console.log(jsData);

  SupplierModel.create(jsData)
    .then(() => {
      res
        .status(200)
        .json({ msg: "Added Supplier Successfully", data: jsData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Supplier not added.");
    });
}

// const updateSupplier = (req, res) => {
//   const toUpdate = req.body;
//   const userID = req.params.id;
//   console.log("User ID: ", userID);
//   console.log(toUpdate);
// };

// const deleteSupplier

module.exports = { getSupplier, addSupplier };
