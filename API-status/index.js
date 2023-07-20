const express = require('express');
const mongoose = require('mongoose');
const Product = require('./productModel');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const port = 8080;

app.get('/products', async (req,res) => {
  try{  
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
})

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