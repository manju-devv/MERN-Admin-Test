import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import multer from "multer";


const userRouter = express.Router();
const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true}
});

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

const empSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  mobile:{type:String,required:true},
  designation:{type:String,required:true},
  gender:{type:String,required:true},
  courses:{type:String,required:true},
  image:{type:String,required:true},
},{ timestamps: true });
const empModel = mongoose.models.employee || mongoose.model("employee",empSchema);

const storage = multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
  }
});
const upload = multer({storage: storage}).single("image")

userRouter.post('/register',async(req,res)=>{
  const {email,name,password} = req.body;
  try{
    const exists = await userModel.findOne({email});
    if(exists){
      return res.json({success:false,message:"email already exists! please login"})
    }
    if (!password) {
      return res.json({ success: false, message: "Password is required" });
    }
    if(password.length<7){
      return res.json({success:false,message:"please provide strong password"})
    }
    const salt = await bcrypt.genSalt(10);
    const hassedPass = await bcrypt.hash(password,salt)
    const newUser = new userModel({
      name:name,
      email:email,
      password:hassedPass,
    });
    const user = await newUser.save();
    res.json({success:true,message:'user added successfully',user:user})
  }catch(err){
    res.json({success:false,message:`some err occured ${err}`})
  }
})
userRouter.post('/login',async(req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"user doesnt exist please register!"})
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
      return res.json({success:false,message:"invalid Password!"})
    }
    res.json({success:true,message:`welcome`,data:user})
  } catch(e){
    res.json({success:false,message:e})
  }
});

userRouter.post("/addEmployee",upload,async(req,res)=>{
  const addEmp = new empModel({
    name:req.body.name,
    email:req.body.email,
    mobile:req.body.mobile,
    designation:req.body.designation,
    gender:req.body.gender,
    courses:req.body.courses,
    image:req.file.filename,
  })
  try{
    const lol = await addEmp.save();
    res.json({success:true,message:"employee added",data:lol})
  }catch(e){
    res.json({success:false,message:`error ${e}`})
  }
})

userRouter.get("/empdetails", async(req,res)=>{
  try{
    const empl = await empModel.find({})
    res.json({success:true,data:empl})
  } catch(e){
    res.json({success:false,message:"something went wrong"})
  }
});

userRouter.delete("/remove/:id",async (req,res)=>{
  try{
    await empModel.findByIdAndDelete(req.params.id);
    res.json({success:true,message:'deleted'})
  }catch(e){
    res.json({success:false,message:"error occured and failed"})
  }
})
export default userRouter;