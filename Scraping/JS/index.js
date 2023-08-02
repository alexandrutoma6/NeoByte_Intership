const puppeteer = require('puppeteer');
const { MongoClient } = require('mongodb');
require('dotenv').config();

(async () => {
    try {
      const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: ['--disable-web-security', '--allow-cross-origin-auth-prompt'],
        headless: true,
      });
      const page = await browser.newPage();
  
      const olxLink = 'https://www.olx.ro/imobiliare/apartamente-garsoniere-de-vanzare/1-camera/?currency=EUR';
      await page.goto(olxLink);
  
      const titleSelector = 'h6.css-16v5mdi.er34gjf0';
      const priceSelector = 'p.css-10b0gli.er34gjf0';

      const titleElements = await page.$$(titleSelector);
      const priceElements = await page.$$(priceSelector);
  
      const titles = [];
      const prices = [];
      
      for (const titleElement of titleElements) {
        const title = await page.evaluate(element => element.textContent, titleElement);
        titles.push(title);
      }
  
      for (const priceElement of priceElements) {
        const price = await page.evaluate(element => element.textContent, priceElement);
        prices.push(price);
      }
  
      await browser.close();
  
      // Connect to MongoDB
      const client = await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME);
  
      // Insert the scraped titles and prices into MongoDB
      const data = titles.map((title, index) => ({ title, price: prices[index] }));
      const result = await collection.insertMany(data);
  
      console.log('Data:', data);
      console.log(`${data.length} ads were added to MongoDB`);
  
      // Close the MongoDB connection
      client.close();
    } catch (err) {
      console.error('Error occurred:', err);
    }
  })();