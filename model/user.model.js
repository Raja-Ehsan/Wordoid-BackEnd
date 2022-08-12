const mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    userEmail:{
        type:String
    },
    userPassword:{
        type:String
    },
    refreshToken:{
        type:String
    }
})

mongoose.model("User",userSchema)