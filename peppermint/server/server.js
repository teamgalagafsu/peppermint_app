const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();
const PORT = 3000;
const User = require('./models/user');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors())
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {console.log(err)}
    else {console.log("Connected to the database")}
});

const productRoutes = require('./routes/product');
app.use("/api", productRoutes);

const userRoutes = require("./routes/auth");
app.use("/api", userRoutes);

app.listen(PORT, (err) => {
    if (err) {console.log(err)} else {console.log("listening on port ", PORT)};
});
