const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./userModel');
//const Advertisement = require('./adModel');
const app = express();
//app.use(express.static('public'));
app.use(express.json());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
a//pp.set('view engine', 'ejs');

const PORT = process.env.PORT;
const mongooseUrl = process.env.MONGOOSE_URL;




//const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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