const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const userModel = mongoose.model("User");
const handleNewUser = async (req, res) => {
    console.log(req.body)
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await userModel.findOne({userName:user});
        if(data){
            console.log('luluul'); res.json({ exists: true })
        }
        else{ 
            const newUser= new userModel({userName:user,userPassword:hashedPassword,userEmail:email});
            newUser.save().then((data)=>{
                res.json({ done: true })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = handleNewUser;