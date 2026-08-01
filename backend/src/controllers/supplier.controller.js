// =======TO DO===============
// View supplier products
// View supplier orders

const fs = require("fs");
const SupplierModel  = require("../models/supplier.model");


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
  const supplierId = req.params.id;
  const supplierData = req.body;
  console.log(supplierId);

  SupplierModel.findByIdAndUpdate(supplierId).then((supplier) => {
    if (!supplier) {
      return res
        .status(404)
        .json({ msg: "Cannot find Supplier by ID", data: null });
    }
    return res.status(200).json({
      success: true,
      message: `Supplier ${id} updated successfully`,
      data: supplierData,
    });
  });
};

// DELETE - Delete a supplier
const deleteSupplier = (req, res) => {
  const id = req.params.id;
  console.log(id);

  SupplierModel.findByIdAndDelete(id).then((supplier) => {
    if (!supplier) {
      return res.status(404).send("Cannot find Supplier by ID");
    }
    return res
      .status(200)
      .json({
        success: true,
        message: `Supplier ${id} deleted successfully`,
        data: supplier,
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting Supplier");
      });
  });
};

// const getSupplierProducts

module.exports = { getSupplier, addSupplier, updateSupplier, deleteSupplier };
