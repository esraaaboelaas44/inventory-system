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

const updateSupplier = (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    message: `Supplier ${id} updated successfully`,
    data: req.body,
  });
};

// DELETE - Delete a supplier
const deleteSupplier = (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    message: `Supplier ${id} deleted successfully`,
  });
};

module.exports = { getSupplier, addSupplier, updateSupplier, deleteSupplier };
