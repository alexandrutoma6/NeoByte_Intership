const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

let db;

async function connectToDatabase() {
    try {
      const client = await MongoClient.connect(MONGO_URI);
      db = client.db(DB_NAME);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }
  
  connectToDatabase();

app.get('/api/ads', async (req, res) => {
    try {
      const adsCollection = db.collection(COLLECTION_NAME);
      const adsData = await adsCollection.find({}).toArray();
      console.log(adsData);
      res.json(adsData);
    } catch (err) {
      console.error('Error fetching ads data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});