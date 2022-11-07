const mongoose = require("mongoose");
const express = require("express")
const app = express();

const product = require("./models/products");
const costmer = require("./models/costmer-table");
const router = require("./router/router");

app.use(router)
app.use(express.json());






// //creating product table
// async function insertProducts() {
//     let data = await product.find();
//     if (data.length == 0) {
//         const data = await product.create({
//             product_id: "PRD500",
//             product_type: "Electronics",
//             item_name: "Mobile",
//             available_quantity: 50,
//             price: 200
//         })
//         const data1 = await product.create({
//             product_id: "PRD501",
//             product_type: "Electronics",
//             item_name: "Fridge",
//             available_quantity: 15,
//             price: 500
//         })
//         const data2 = await product.create({
//             product_id: "PRD502",
//             product_type: "Electronics",
//             item_name: "Telivision",
//             available_quantity: 10,
//             price: 300
//         })
//         const data4 = await product.create({
//             product_id: "PRD504",
//             product_type: "Furniture",
//             item_name: "Table",
//             available_quantity: 5,
//             price: 200
//         })
//         const data5 = await product.create({
//             product_id: "PRD505",
//             product_type: "Furniture",
//             item_name: "Bed",
//             available_quantity: 12,
//             price: 400
//         })
//         const data6 = await product.create({
//             product_id: "PRD506",
//             product_type: "Furniture",
//             item_name: "Sofa",
//             available_quantity: 10,
//             price: 300
//         })
//         const data7 = await product.create({
//             product_id: "PRD506",
//             product_type: "Furniture",
//             item_name: "chair",
//             available_quantity: 50,
//             price: 100
//         })
//     }
// }

// insertProducts();


// // creating initial costmer table
// async function createCostmer() {
//     const data = await costmer.find();
//     if (data.length == 0) {
//         await costmer.create({
//             costmer_id: "CT100",
//             email: "Rahul@gmail.com",
//             costmer_name: "rahul"
//         })
//         await costmer.create({
//             costmer_id: "CT101",
//             email: "sana@gmail.com",
//             costmer_name: "joey"
//         })
//         await costmer.create({
//             costmer_id: "CT102",
//             email: "Ashley@gmail.com",
//             costmer_name: "Ashley"
//         })
//         await costmer.create({
//             costmer_id: "CT103",
//             email: "Junaid@gmail.com",
//             costmer_name: "Junaid"
//         })
//         await costmer.create({
//             costmer_id: "CT104",
//             email: "priya@gmail.com",
//             costmer_name: "priya"
//         })
//     }
// }
// createCostmer();

mongoose.connect("mongodb://localhost:27017/api_web_tech_assignment", (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Connected to DB");
    }
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
});