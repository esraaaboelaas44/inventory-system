const { stockModel } = require("../models/stock.model");

const createStock = async (productName,categoryId,quantity,newquantity,action,userID) => {

    return await stockModel.create({
        Name: productName,
        category: categoryId,
        quantity:quantity,
        newquantity: newquantity,
        action:action,
        performedBy:userID
    });
};

module.exports = { createStock };
