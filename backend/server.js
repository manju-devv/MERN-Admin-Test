import express from "express";
import userRouter from "./routes/userRouter.js";
import connectDB from "./controllers/db.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/images",express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

connectDB()
app.get("/",(req,res)=>{
  res.send("welcome to the backend")
});

app.use("/api/user",userRouter);

app.listen(port,()=>{
  console.log('server on 5000')
})