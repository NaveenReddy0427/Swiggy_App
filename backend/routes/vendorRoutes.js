import express from "express"
import {vendorRegister, vendorLogin, getAllVendors, getVendorById} from "../controllers/vendorController.js";


const vendorRoutes = express.Router()

vendorRoutes.post('/register', vendorRegister)
vendorRoutes.post('/login', vendorLogin)
vendorRoutes.get('/all-vendors', getAllVendors)
vendorRoutes.get('/single-vendor/:id', getVendorById)


export default vendorRoutes;

