// import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// init
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

// init routes
hotelsRouter = require('./src/api/hotels')
app.use('/api/hotels',hotelsRouter);
app.get('/form',(req,res)=>{
  res.sendFile(path.join(__dirname+'/src/pages/form.html'));
})
app.get("/details", (req, res) => {
    res.sendFile(path.join(__dirname+'/src/data/details.txt'));
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);

