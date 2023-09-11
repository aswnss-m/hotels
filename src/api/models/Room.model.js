const mongoose  = require("mongoose");

const roomSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    price : {
        type : mongoose.Types.Decimal128,
        required : true
    },
    capacity : {
        type : Number,
        required : true
    },
})
const Room = mongoose.model('Room',roomSchema);
module.exports = Room;