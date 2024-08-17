import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import vendorRoutes from "./routes/vendorRoutes.js"
import firmRoutes from "./routes/firmRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import path from "path"

const app = express()

const PORT = process.env.PORT || 4001

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MONGODB Connected Succesfully!!');
}).catch((error)=>{
    console.log(error);
})


app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)
app.use('/firm', firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use('/', (req, res) => {
    res.send("<h1> Welcome to swiggy");
})