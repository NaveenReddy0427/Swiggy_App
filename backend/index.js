import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import vendorRoutes from "./routes/vendorRoutes.js"
import bodyParser from "body-parser"

const app = express()

const PORT = 4001

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MONGODB Connected Succesfully!!');
}).catch((error)=>{
    console.log(error);
})


app.use('/home', (req, res)=>{
    res.send('<h1>welcome to the swiggy app</h1>')
})


app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})