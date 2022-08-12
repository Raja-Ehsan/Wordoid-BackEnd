const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Learn", (err) => {
    if (!err) {
        console.log("Success");
    }
    else {
        console.log("Error connecting to database")
    }
})

const blog=require("./blog.model")
const user=require("./user.model")