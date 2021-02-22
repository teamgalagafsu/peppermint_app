const router = require('express').Router();
const Product = require("../models/product");

const upload = require("../middleware/upload-photo");

//post single product
router.post("/products", upload.single("photo"), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title; product.description = req.body.description;
        product.photo = req.file.location; product.price = req.body.price;
        await product.save();
        res.json({status:true, message: "product successfully saved"});
    } catch (err) { res.status(500).json({success: false, message: err.message}) }
});

// get all products
router.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        res.json({success: true, products: products})
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
});

// get single product
router.get("/products/:id", async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });
        res.json({success: true, product: product});
    } catch (err) { 
        res.status(500).json({success: false, message: err.message});
    }
});

// update a single product with PUT api
router.put("/products/:id", upload.single("photo"), async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {
                title: req.body.title,
                description: req.body.description,
                photo: req.file.location,
                price: req.body.price
            }},
            {upsert: true}
        );
        res.json({success: true, updatedProduct: product});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
});

// delete a single product
router.delete("/products/:id", async (req, res) => {
    try {
        let deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });
        if (deleteProduct) {res.json({status:true, message: "Product successfully deleted"})};
    } catch (err) {res.status(500).json({success: false, message: err.message});}
});

module.exports = router;