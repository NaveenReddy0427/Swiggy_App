import Vendor from "../models/Vendor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const secretKey = process.env.SECRETKEY

export const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Await the result of the findOne query
        const vendorEmail = await Vendor.findOne({ email });

        if (vendorEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new vendor instance
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new vendor to the database
        await newVendor.save();

        res.status(201).json({ message: "Vendor Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Register Unsucessfull" });
    }
};

export const vendorLogin = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const vendor = await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({vendorId: vendor._id}, secretKey, { expiresIn: "1h" })

        res.status(200).json({success: "Login Successfully", token})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login Unsucessfull" });
    }
}

export const getAllVendors = async(req, res)=>{
    try {
        const vendors = await Vendor.find().populate('firm')
        res.json({vendors})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

export const getVendorById = async(req, res)=>{

    const vendorId = req.params.id
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({message: "Vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"})
    }
}

