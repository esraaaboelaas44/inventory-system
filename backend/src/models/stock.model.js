const mongoose = require("mongoose");
const { Schema } = mongoose;
const stockSchema = new Schema(
{

  productName: 
  {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  category: 
  {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  action: 
  {type: String
    ,enum: ["Add", "Remove", "Update"]
    ,required: true
    ,trim: true
  },
  quantity: 
  {
    type: Number
    ,required: true
    ,trim: true
  },
  performedBy: 
  {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},{ timestamps: true , versionKey: false });
const stockModel = mongoose.model("stockmovements", stockSchema);

module.exports = { stockModel };
