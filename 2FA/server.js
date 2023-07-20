const express = require('express');
var cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
app.post('/login', async (req,res) => {
    const data = await req.body;
    console.log(data);
    res.status(200).json("ok")
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });