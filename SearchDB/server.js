const express = require('express');
const mongodb = require('mongodb');

const app = express();
let cors = require("cors");
app.use(cors());
const port = 3000;


const mongoURL = 'mongodb+srv://atoma6:parola123@nodejsapi.poinrf1.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'customers';

app.get('/customers', (req, res) => {
  const searchQuery = req.query.name;

  mongodb.MongoClient.connect(mongoURL, { useUnifiedTopology: true })
    .then(client => {
      const db = client.db(dbName);
      const customersCollection = db.collection('customers');
      console.log('Entered the db');
      // Search for customers by name in the database
      customersCollection.find({ name: searchQuery }).toArray()
        .then(customers => {
          res.json(customers);
        })
        .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ error: 'An error occurred' });
        })
        .finally(() => {
          client.close();
        });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to connect to the database' });
    });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
