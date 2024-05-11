const { text } = require('express')
const mongoose=require('mongoose')

const ChatSchema=new mongoose.Schema({

    conversationId:{type:String},
    sender:{type:String},
    text:{type:String}

})

module.exports=mongoose.model('Chat',ChatSchema)