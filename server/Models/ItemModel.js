const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item: { type: String },
    model: { type: String },
    colour:{ type: String },
    location:{ type: String },
    fileurl:{ type: String },
    phoneNumber: { type: String },
    address: { type: String },
    type:{type:String},
    username:{type:String},
    Userid:{type:String},
    Email:{type:String},
    category:{type:String}

  
},{timestamps:true});

module.exports = mongoose.model('Item', ItemSchema);
