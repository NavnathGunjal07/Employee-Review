const mongoose = require('mongoose');


// creating schema for storing user details
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    performanceReview:[{
        name:String,
        review:String
    }],
    assignedWorks:[{
        name:String,
        uId:String,
    }]
},{
    timestamps:true
});


const user = mongoose.model('User', userSchema);
module.exports = user;