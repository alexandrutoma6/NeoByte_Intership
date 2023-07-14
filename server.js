const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('combined'));
const port = 8080;
const redis = require('redis')
let client

(async () => {
    client = redis.createClient()
    await client.connect()
})()

//ROUTES

//get all the products in dbs
app.get('/productsList', async(req,res) =>{
    try {
        const products = await Product.find({});
        client.set("products", products)
        console.log("Prod loaded")
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

//get the product found by id
app.get('/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});


//add a product to db
//the request body is JSON object
app.post('/productAdd', async (req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});


//CONNECTION TO DB
mongoose.connect('mongodb+srv://atoma6:parola123@nodejsapi.poinrf1.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to Db')
    app.listen(port, () => {
        console.log(`Connected to port ${port}`);
    });
}).catch((error) =>{
    console.log(error)
});