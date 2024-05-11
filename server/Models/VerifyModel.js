const { text } = require('express')
const mongoose=require('mongoose')

const VerifySchema=new mongoose.Schema({

    message:{type:String},
    fileurl:{type:String},
    rewardAmount:{type:String},
    person:{type:String},
    Email:{type:String},
    whosends:{type:String}

})

module.exports=mongoose.model('Verify',VerifySchema)