const express=require("express");
const mongoose=require("mongoose");
const router =express.Router();
const blogModel=mongoose.model("Blog");

router.get("/get",async (req,res)=>{
    try{
        const data = await blogModel.find();
        res.json(data)
    }catch(err){
        res.log(err)
    }
})
router.get("/featured",async (req,res)=>{
    try{
        const data = await blogModel.find({featured:true});
        res.json(data)
    }catch(err){
        console.log(err)
    }
})
router.get("/getBlogs/:id",async (req,res)=>{
    try{
        const data = await blogModel.find({ blogName : { $regex: req.params.id, $options: 'i' } });
       res.json(data)
    }catch(err){
        console.log(err)
    }
})
router.get("/get/:id",async (req,res)=>{
    try{
        const data = await blogModel.find({userId:req.params.id});
        res.json(data)
    }catch(err){
        console.log(err)
    }
})
router.get("/get/profile/:id",async (req,res)=>{
    try{
        const data = await blogModel.find({userId:req.params.id}).sort({'timesRead': -1}).limit(2);
        res.json(data)
    }catch(err){
        console.log(err)
    }
})
router.get("/get/article/:id",async (req,res)=>{
    try{
        const data = await blogModel.find({_id:req.params.id}).sort({'timesRead': -1}).limit(2);
        res.json(data[0])
    }catch(err){
        console.log(err)
    }
})
router.delete("/delete/article/:id",async (req,res)=>{
    try{
        await blogModel.deleteOne({_id:req.params.id})
        res.json({message:'Article Deleted'})
    }catch(err){
        console.log(err)
    }
})
router.post("/uploadBlog",async (req,res)=>{
    try{
        const newBlog= new blogModel(req.body);
        await newBlog.save();
        res.json({message:'Added'})
    }catch(err){
        console.log(err)
    }
})

router.post("/updateBlog/:id",async (req,res)=>{
    try{
        console.log(req.body)
        const {blogName,blogText,blogImage}=req.body;
        const doc = await blogModel.findOne({_id:req.params.id});
        doc.blogName=blogName;
        doc.blogText=blogText;
        doc.blogImage=blogImage;
        await doc.save();
        res.json({message:'Added'})
    }catch(err){
        console.log(err)
    }
})

router.put("/incrementRead/:id",async (req,res)=>{
    try{
        await blogModel.findOneAndUpdate({_id:req.params.id},{$inc:{timesRead:1}})
        console.log("Incremented")
    }catch(err){
        console.log(err)
    }
})

router.post("/changeAuthorName/:id",async (req,res)=>{
    try{
        await blogModel.updateMany({userId:req.params.id}, { blogAuthor: req.body.blogAuthor });
        res.json({message:'Added'})
    }catch(err){
        console.log(err)
    }
})
module.exports=router;