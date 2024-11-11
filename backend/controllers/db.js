import mongoose from "mongoose";
const url = 'mongodb://127.0.0.1:27017/mixi';

const connectDB = async() => {
  await mongoose.connect(url)
 .then(() => {
  console.log('db connected')
 }).catch((err) => {
  console.log(err)
 });
}

export default connectDB;