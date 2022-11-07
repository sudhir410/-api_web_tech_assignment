const mongoose = require("mongoose");

const costmerSchema = mongoose.Schema({
    costmer_name: { type: String },
    email: { type: String, unique: true },
    balance: {type:Number}
})

const costmer = mongoose.model("Costmer", costmerSchema);

module.exports = costmer;