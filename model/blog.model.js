const mongoose=require('mongoose');

var BlogSchema=new mongoose.Schema({
    blogName:{
        type:String,
        required:"Required"
    },
    userId:{
        type:String
    },
    blogAuthor:{
        type:String
    },
    blogDate:{
        type:String
    },
    featured:{
        type:Boolean
    },
    timesRead:{
        type:Number
    },
    blogImage:{
        type:String
    },
    blogText:{
        type:String
    }
})

mongoose.model("Blog",BlogSchema)