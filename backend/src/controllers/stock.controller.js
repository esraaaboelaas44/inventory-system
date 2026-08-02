const { stockModel } = require("../models/stock.model");

//get&getid
const getStock = (req, res) => {

  stockModel
  .find()
  .populate("productName", "name")
  .populate("category", "name")
  .populate("performedBy", "name")
  .lean()

  .then((stocks) => {

    const result = stocks.map(stock => ({
      id: stock._id,
      product: stock.productName?.name,
      category: stock.category?.name,
      action: stock.action,
      quantity: stock.quantity,
      performedBy: stock.performedBy?.name,
      date: stock.createdAt
    }));

    res.status(200).json(result);
  })

  .catch((error) => 
  {
    res.status(500).json({message: error.message});
  });

};

const getStockId = (req, res) => {
  const id = req.params.id;
  stockModel
    .findById(id)
    .populate("productName", "name")
    .populate("category", "name")
    .populate("performedBy", "name")
    .then((stock) => {
      const result = 
      {
        id: stock._id,
        product: stock.productName?.name,
        category: stock.category?.name,
        action: stock.action,
        quantity: stock.quantity,
        performedBy: stock.performedBy?.name,
        date: stock.createdAt
      };
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send({message: error.message});
    });
};
module.exports = { getStock,getStockId};

















//========================================================================
// //add
// const addStock = (req, res)=> {
//   const data = req.body;
//   stockModel
//     .create(data)
//     .then(() => {
//       res.status(201).json({ msg: "success", data: data });
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// }

// //update
// const updateStock = (req, res) => {

//   const id = req.params.id;
//   const data = req.body;
//   stockModel
//     .findByIdAndUpdate(id, data, { new: true })
//     .then((stock) => {
//       res.status(200).json({ 
//         msg: "success", 
//         data: stock 
//       });
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });

// };

// //delete
// const deleteStock = (req, res) => {

//   const id = req.params.id;

//   stockModel
//     .findByIdAndDelete(id)
//     .then((stock) => {

//       res.status(200).json({
//         msg: "deleted success",
//         data: stock
//       });

//     })
//     .catch((err) => {

//       res.status(500).send(err);

//     });

// };

// const deleteAllStock = (req, res) => {

//   stockModel
//     .deleteMany({})
//     .then((stock) => {

//       res.status(200).json({
//         msg: "deleted success",
//         data: stock
//       });

//     })
//     .catch((err) => {

//       res.status(500).send(err);

//     });

// };
//==================================================================
