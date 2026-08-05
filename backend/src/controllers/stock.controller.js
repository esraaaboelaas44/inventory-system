const { stockModel } = require("../models/stock.model");
const productModel  = require("../models/product.model");


//get&getid
const getStock = (req, res) => {

  stockModel
  .find()
  .then((stocks) => {

    const result = stocks.map((stock) => ({
      product: stock.Name,
      category: stock.category,
      action: stock.action,
      oldquantity: stock.quantity,
      newquantity: stock.newquantity, 
      performedBy: stock.performedBy,
      date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
    }));

    res.status(200).json({count: stocks.length,data: result});
  })

  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });

};

const getStockId = (req, res) => {

  const id = req.params.id;
  stockModel
  .findById(id)
  .then((stock) => {
    const result = 
    { 
      product: stock.Name,
      category: stock.category,
      action: stock.action,
      oldquantity: stock.quantity,
      newquantity: stock.newquantity,
      performedBy: stock.performedBy,
      date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
    };
    res.status(200).json(result);
  })
  .catch((err) => {
    res.status(500).json({message: err.message});
  });
};

//------------------------------------------------------------------
// all get

const getLowStockProducts = (req, res) => {

  productModel.find({quantity: { $lte: 10 }})
  .then((stocks) => 
  {
    const result = stocks.map((stock) => ({
      product: stock.name,
      category: stock.category,
      quantity: stock.quantity,
      date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
    }));
    res.status(200).json({count: stocks.length,data: result});
  })
  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });
};

//-------------

const getAdd = (req, res) => {

  stockModel.find({action: "Add" })
  .then((stocks) => 
  {
    const result = stocks.map((stock) => ({
      product: stock.Name,
      category: stock.category,
      action: stock.action,
      oldquantity: stock.quantity,
      newquantity: stock.newquantity,
      performedBy: stock.performedBy,
      date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
    }));
    res.status(200).json({count: stocks.length,data: result});
  })
  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });
};


//---------

const getUpdate = (req, res) => {

  stockModel.find({ action: "Update"})
  .then((stocks) => 
  {
    const result = stocks.map((stock) => ({
      product: stock.Name,
      category: stock.category,
      action: stock.action,
      oldquantity: stock.quantity,
      newquantity: stock.newquantity,
      performedBy: stock.performedBy,
      date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
    }));
    res.status(200).json({count: stocks.length,data: result});
  })
  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });
};

//------------

const getRemove = (req, res) => {

  stockModel.find({action: "Remove" })
  .then((stocks) => 
  {
    const result = stocks.map((stock) => ({
      product: stock.Name,
      category: stock.category,
      action: stock.action,
      oldquantity: stock.quantity,
      newquantity: stock.newquantity,
      performedBy: stock.performedBy,
      date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
    }));
    res.status(200).json({count: stocks.length,data: result});
  })
  .catch((err) => 
  {
    res.status(500).json({message: err.message});
  });
};


//search
const findStock = (req, res) => {
  const { search = "", action, category, user } = req.query;

  stockModel
  .find()
  .then((stocks)=>{

  let result = stocks.map((stock) => ({
    product: stock.Name,
    category: stock.category,
    action: stock.action,
    oldquantity: stock.quantity,
    newquantity: stock.newquantity,
    performedBy: stock.performedBy,
    date:new Date(stock.createdAt).toLocaleString("en-US", {year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",second: "2-digit",hour12: true})
  }));

  if(search)
  {
    result = result.filter(stock => 
    
      stock.product.toLowerCase()
      .includes(search.toLowerCase())
    )
  }
  if(action)
  {
    result = result.filter(stock =>
      
      stock.action.toLowerCase()
      .includes(action.toLowerCase())
    )
    
  }
  if(category)
  {
    result = result.filter(stock =>
    
  
      stock.category.toLowerCase()
      .includes(category.toLowerCase())
    )
  }
  if(user)
  {
    result = result.filter(stock =>
    
      stock.performedBy?.userName.toLowerCase()
      .includes(user.toLowerCase())
    )
  }
  res.json({count:result.length,data:result});
  })
  .catch((err)=>{res.status(500).json({message:err.message})});
}

module.exports ={ getStock,getStockId,getLowStockProducts,getAdd,getUpdate,getRemove,findStock};
