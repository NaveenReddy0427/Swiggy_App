import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Vendor from "../models/Vendor.js"

dotenv.config()

const secretKey = process.env.SECRETKEY

const verifyToken = async(req, res, next)=>{

    // retrieve the token 
    const token = req.headers.token
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        // decode the code like vendor._Id and need to find that decoded id in database
        const decoded = jwt.verify(token, secretKey)
        const vendor = await Vendor.findById(decoded.vendorId)

        if(!vendor){
            return res.status(401).json({error: "vendor not found"})
        }

        // if both retrieve id which comes with request and the id in database match then middlware goes to next middlware
        req.vendorId = vendor._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Invalid Token "})
    }
}

export default verifyToken;