import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MONGODB Connected Succesfully!!');
}).catch((error)=>{
    console.log(error);
})

const PORT = 4001

app.use('/home', (req, res)=>{
    res.send('<h1>welcome to the swiggy app</h1>')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})