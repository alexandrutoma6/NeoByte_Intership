const express = require('express');
const mongoose = require('mongoose');
const Product = require('./productModel');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT;

app.get('/products', async (req,res) => {
  try{  
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
})

const mongooseUrl = process.env.MONGOOSE_URL;
//CONNECTION TO DB
mongoose.connect(mongooseUrl)
.then(() => {
    console.log('Connected to Db')
    app.listen(port, () => {
        console.log(`Connected to port ${port}`);
    });
}).catch((error) =>{  
    console.log(error)
});