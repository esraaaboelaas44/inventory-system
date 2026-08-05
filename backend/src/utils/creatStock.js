const { stockModel } = require("../models/stock.model");

const createStock = async (productName,sku,categoryId,quantity,newquantity,action,userID) => {

    return await stockModel.create({
        Name: productName,
        sku:sku,
        category: categoryId,
        quantity:quantity,
        newquantity: newquantity,
        action:action,
        performedBy:userID
    });

    return stockMove;
};

module.exports = { createStock };
