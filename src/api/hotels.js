const express = require('express');
const router = express.Router();

const Hotel = require("./models/Hotel.model");

router.route("/").get((req,res)=>{
    Hotel.find().then((hotels)=>{
        res.json(hotels);
    }).catch((err)=>{
        console.log(err);
    })
}) 
router.route("/form").post((req,res)=>{
    console.log(req.body);
})
module.exports = router;