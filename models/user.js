const mongoose = require('mongoose')

const User =  new mongoose.Schema({
    _id: String,
    name:{
        type:String,
        required:true,
        minLength: [3, 'Name is too short!'],
    },
    password : {
        type:String,
        required:[true, 'password is required'],
        minLength:5
    },
    mobile:{
        type:String,
        required:[true, 'mobile no is required'],
        minLength:10,
        maxLength:10
    },
    email:{
        type:String,
        required:[true, 'email is required']
    },
    address:{
        type:Array,
        required:[true, 'address is required']
    },
    gender: {
        type:String,
        enum: ['MALE', 'FEMALE','OTHER']

    },
    dob :{
        type:Date,
        required:[true, 'dob is required']
    },
    role:{
        type:String,
        required:[true, 'role is required']
    },
},{
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
})

module.exports = mongoose.model('User',User)