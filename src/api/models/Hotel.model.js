const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    website : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rooms : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Room"
    },
    ammenities:{
        type : [String]
    },
    nearbyAttractions:{
        type : [String]
    }
})

const Hotel = mongoose.model('Hotel',hotelSchema);
module.exports = Hotel;