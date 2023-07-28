const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./userModel');
const app = express();
//app.use(express.static('public'));
app.use(express.json());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/signIn', (req, res) => {
    res.sendFile(__dirname + '/signIn.html');
  });
  
app.get('/logIn', (req, res) => {
    res.sendFile(__dirname + '/logIn.html');
  });
  
app.post('/signIn', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
  
    // Process the data or save it to the database
    // For this example, we'll just log the data
    console.log('Sign In Data:');
    console.log('Name:', name);
    console.log('Email:', email);
  
    res.send('Sign In Form submitted successfully!');
  });
  
app.post('/logIn', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
  
    // Process the data or perform login authentication
    // For this example, we'll just log the data
    console.log('Log In Data:');
    console.log('Name:', name);
    console.log('Email:', email);
  
    res.send('Log In Form submitted successfully!');
});

//ADS FORM
app.get('/ads', (req,res) => {
    res.sendFile(__dirname + '/adForm.html')
})
app.post('/submitAd', (req, res) => {
    const ad = req.body.ad;
    const email = req.body.email;
    console.log('Ad:', ad);
    console.log('Email:', email);

    res.send('Form submitted successfully!');
}) 

const PORT = process.env.PORT;
const mongooseUrl = process.env.MONGOOSE_URL;
//CONNECTION TO DB
mongoose.connect(mongooseUrl)
.then(() => {
    console.log('Connected to Db')
    app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}`);
    });
}).catch((error) =>{  
    console.log(error)
});