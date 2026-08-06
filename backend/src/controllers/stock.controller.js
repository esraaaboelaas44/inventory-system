const { stockModel } = require("../models/stock.model");
const productModel  = require("../models/product.model");


//get&getid
const getStock = (req, res) => {

  stockModel
  .find().populate("category", "name")
  .then((stocks) => {

    const result = stocks.map((stock) => ({
      id:stock._id,
      product: stock.Name,
      sku:stock.sku,
      category: stock.category?.name,
      action: stock.action,
      oldquantity: stock.quantity,
      newquantity: stock.newquantity, 
      performedBy: stock.performedBy,
      date:stock.createdAt
    }));

    res.status(200).json({data: result});
  })

  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });

};



const getLowStockProducts = (req, res) => {

  productModel.find({quantity: { $lte: 10 }}).populate("category", "name")
  .then((stocks) => 
  {
    const result = stocks.map((stock) => ({
      id:stock._id,
      product: stock.name,
      sku:stock.sku,
      category: stock.category?.name,
      quantity: stock.quantity,
      date:stock.createdAt
    }));
    res.status(200).json({count: stocks.length,data: result});
  })
  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });
};

const deleteStock = (req, res) => {

  const id = req.params.id;

  stockModel.findByIdAndDelete(id)
    .then((stock) => {

      if (!stock) {
        return res.status(404).json({ message: "Movement not found" });
      }

      res.status(200).json({
        message: "Movement deleted successfully"
      });

    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });

};

module.exports ={ getStock,getLowStockProducts,deleteStock};

