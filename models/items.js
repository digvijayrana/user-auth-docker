const mongoose = require('mongoose')

const items = new mongoose.Schema({
    _id: {
        type:String,
    },  
    name: {
        type:String,
        required:true,
        minLength: [3, 'Name is too short!'],

    },
    description: {
        type:String,
        required:[true, 'description is required'],
        
    },
    price:{
        type:String,
        required:[true, 'price is required'],
    },
    quantity:{
        type:Number,
        required:[true, 'quantity is required'],

    },
    category: {
        type:String,
        required:[true, 'category is required'],
    },
},
{
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
})


module.exports = mongoose.model('Items',items,'Items');