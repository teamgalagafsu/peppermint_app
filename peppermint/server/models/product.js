const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: String, description: String, photo: String, price: Number
});
module.exports = mongoose.model("Product", ProductSchema);