const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    data : {
        type : String
    }
},{timestamps:true});

const Log = mongoose.model('Log',logSchema);
module.exports = Log;