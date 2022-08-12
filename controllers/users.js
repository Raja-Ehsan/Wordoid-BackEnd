const express=require("express");
const mongoose=require("mongoose");
const router =express.Router();
const userModel=mongoose.model("User");
const bcrypt = require('bcryptjs');
router.post("/getProfile",async (req,res)=>{
    try{
        const data = await userModel.find({_id:req.body.id});
        res.json(data)
    }catch(err){
        res.json(err)
    }
})

router.post("/updateProfile/:id",async (req,res)=>{
    try{
        const {userName,userEmail,userPassword}=req.body;
        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const doc = await userModel.findOne({_id:req.params.id});
        doc.userName=userName;
        doc.userEmail=userEmail;
        doc.userPassword=hashedPassword;
        await doc.save();
        res.json({message:'Added'})
    }catch(err){
        console.log(err)
    }
})

module.exports=router;