const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    product_id: { type: String, unique: true },
    product_type: { type: String },
    item_name: { type: String },
    available_quantity: { type: Number },
    price: { type: Number }
})

const product = mongoose.model("products", productSchema);

module.exports = product;