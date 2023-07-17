const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/productModel')
const morgan = require('morgan');
//const NodeCache = require( "node-cache" );
const app = express();
app.use(express.json());
app.use(morgan('combined'));
const port = 8080;
const redis = require('redis');
const e = require('express');
let client
//const myCache = new NodeCache();

//CONNECT TO REDIS SERVER
(async () => {
    client = redis.createClient()
    await client.connect()
})();


//ROUTES

//get all the products in dbs
//if data is in cache, fetch it from there, else get it from db
app.get('/products', async(req,res) => {
    const cacheData = await client.get('products');
    if(!cacheData){
        console.log('Trying to fetch data from db')
        try {
            const products = await Product.find({});
            client.set('products',JSON.stringify(products));
            console.log('Data fetched from the db');
            console.log('Data send to cache');

        } catch (error) {
            console.error('Error on fetching data from db ',error);
            return res.status(500).json(error);
        }
    }   
    res.status(200).json(JSON.parse(cacheData));
    console.log('Data fetched'); 
});


//get the product found by id
app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});


//
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the data exists in the Redis cache
        client.get(id, async (error, cachedData) => {
            if (error) {
                console.error('Redis GET Error:', error);
            }

            if (!cachedData) {
                // Data not found in cache, retrieve from the database
                const product = await Product.findById(id);
                // Store the data in Redis cache
                client.setex(id, 3600, JSON.stringify(product));
            }
            // Data exists in the cache, return the cached data
            res.status(200).json(JSON.parse(cachedData));
            // Return the data
                res.status(200).json(product);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//


//add a product to db
//the request body is JSON object
app.post('/product/Add', async (req,res) => {
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