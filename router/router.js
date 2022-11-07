const express = require("express");
const router = express.Router();
const products = require("../models/products");
const costmer = require("../models/costmer-table");
const order = require("../models/order-table");
router.use(express.json())


router.get("/", (req, res) => {
    res.send("welcome to e-commerse")
})



router.post("/order", async (req, res) => {
    try {
        const { email, product, quantity } = req.body;
        const user = await costmer.findOne({ email });
        const productDetails = await products.findOne({ item_name: product });
        const value = quantity * productDetails.price
        const qty = productDetails.available_quantity;
        if (quantity > qty) {
            res.send("Out of Stock")
            return
        }
        if (user) {
            if (user.balance >= quantity * productDetails.price) {
                const newOrder = await order.create({
                    costmer_id: user.costmer_id,
                    product_id: productDetails.product_id,
                    item_name: product,
                    quantity: quantity,
                    orderValue: value
                })
                res.send({ message: "orded placed" })
            }
            else {
                res.send({ message: "insufficient balance" })
            }

        }
        else {
            res.send({ message: "user not registerd" });
        }
        await products.updateOne({ item_name: product }, { available_quantity: qty - quantity })
        res.send("success")
    } catch (err) {
        res.send(err.message)
    }
})


router.post("/product", async (req, res) => {
    const { name, quantity, type, price } = req.body;
    try {
        const product = await products.findOne({ item_name: name })
        if (product) {
            await products.updateOne({ item_name: name }, { available_quantity: product.available_quantity + quantity });
            res.send({ message: "product allready exist, new quantity added in privious quantity" })
        }
        else {
            await products.create({
                product_type: type,
                item_name: name,
                available_quantity: quantity,
                price
            });
            res.send({ message: "success" });
        }
    } catch (error) {
        res.send(error.message);
    }
})

router.post("/costmer", async (req, res) => {
    const { name, email, amount } = req.body;
    try {
        const user = await costmer.findOne({ email });
        if (user) {
            await costmer.updateOne({ email }, { balance: user.balance + amount });
            res.send({ message: "user allready exist, new amount is added in the previouse balance" })
        }
        else {
            await costmer.create({
                costmer_name: name,
                email,
                balance: amount
            })
            res.send({ message: "successfully created new user" })
        }
    } catch (error) {
        res.send(error.message);
    }
})



router.get("/orders/:orderID", async (req, res) => {
    let id = req.params.orderID;
    try {
        const tractOrder = await order.findOne({ _id: id });
        if (tractOrder) {
            res.send({ tractOrder });
        }
        else {
            res.send({ message: "wrong order id" });
        }
    } catch (error) {
        res.send(error.message)
    }
})

router.get("/product/:productID", async (req, res) => {
    let id = req.params.productID;
    try {
        const product = await products.findOne({ _id: id });
        const type = await products.findOne({ product_type: id });
        if (product) {
            res.send(product);
        }
        else if (type) {
            res.send(type);
        }
        else {
            res.send({ message: "wrong input" })
        }
    } catch (error) {
        res.send(error.message)
    }

})

router.get("/costmer/:customerID", async (req, res) => {
    let id = req.params.customerID;
    try {
        const user = await costmer.findOne({ _id: id });
        if (product) {
            res.send(user);
        }
        else {
            res.send({ message: "wrong product ID" })
        }
    } catch (error) {
        res.send(error.message)
    }
})


router.put("/:productName/:availableQuantity", async (req, res) => {
    const productName = req.params.productName;
    const qty = req.params.availableQuantity;
    try {
        const product = await products.findOne({ item_name: name })
        if (product) {
            await products.updateOne({ item_name: productName }, { available_quantity: qty });
            res.send({ message: "product allready exist, new quantity added in privious quantity" })
        }
        else {
            res.send({ message: "no such product found" });
        }
    } catch (error) {
        res.send(error.message);
    }
})

router.put("/costmer", async (req, res) => {
    const { name, email, amount } = req.body;
    try {
        const user = await costmer.findOne({ email });
        if (user) {
            await costmer.updateOne({ email }, { balance: user.balance + amount });
            res.send({ message: "user allready exist, new amount is added in the previouse balance" })
        }
        else {
            await costmer.create({
                costmer_name: name,
                email,
                balance: amount
            })
            res.send({ message: "successfully created new user" })
        }
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;