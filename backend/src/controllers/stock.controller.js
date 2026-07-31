const { stockModel } = require("../models/stock.model");

//get&getid
const getStock = (req, res) => {
  stockModel
    .find()
    .then((stock) => {
      res.status(200).json({ msg: "success", data: stock });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getStockId = (req, res) => {
  const id = req.params.id;
  stockModel
    .findById(id)
    .then((stock) => {
      res.status(200).json({ msg: "success", data: stock });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//add
const addStock = (req, res)=> {
  const data = req.body;
  stockModel
    .create(data)
    .then(() => {
      res.status(201).json({ msg: "success", data: data });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//update
const updateStock = (req, res) => {

  const id = req.params.id;
  const data = req.body;
  stockModel
    .findByIdAndUpdate(id, data, { new: true })
    .then((stock) => {
      res.status(200).json({ 
        msg: "success", 
        data: stock 
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });

};

//delete
const deleteStock = (req, res) => {

  const id = req.params.id;

  stockModel
    .findByIdAndDelete(id)
    .then((stock) => {

      res.status(200).json({
        msg: "deleted success",
        data: stock
      });

    })
    .catch((err) => {

      res.status(500).send(err);

    });

};

module.exports = { getStock, addStock,deleteStock,updateStock,getStockId };
