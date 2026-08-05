const mongoose = require("mongoose");
const { Schema } = mongoose;
const stockSchema = new Schema(
{

  Name: 
  {
    type: String,
    required: true
    ,trim: true
  },
  category: 
  {
    type: String,
    required: true,
    trim: true,
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
  newquantity: {
    type: Number,
    required: true
  },
  performedBy: 
  {
    type: String,
    required: true
    ,trim: true
  }
},
{ timestamps: true , versionKey: false }
);
const stockModel = mongoose.model("stockmovements", stockSchema);

module.exports = { stockModel };
