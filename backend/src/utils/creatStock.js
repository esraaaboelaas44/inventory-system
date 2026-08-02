const { stockModel } = require("../models/stock.model");

const createStock = async (productId,action,quantity,categoryId,userID) => {

    return await stockModel.create({
        productName: productId,
        category: categoryId,
        action:action,
        quantity:quantity,
        performedBy:userID

    });

    return stockMove;
};

module.exports = { createStock };