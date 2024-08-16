import Vendor from "../models/Vendor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        res.status(200).json({success: "Login Successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login Unsucessfull" });
    }
}

