const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    costmer_id: { type: String },
    product_id: { type: String },
    item_name: { type: String },
    quantity: { type: Number },
    orderValue: { type: Number }
})

const order = mongoose.model("order", orderSchema);

module.exports = order;