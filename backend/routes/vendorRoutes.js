import express from "express"
import {vendorRegister, vendorLogin, getAllVendors} from "../controllers/vendorController.js";


const vendorRoutes = express.Router()

vendorRoutes.post('/register', vendorRegister)
vendorRoutes.post('/login', vendorLogin)
vendorRoutes.get('/all-vendors', getAllVendors)


export default vendorRoutes;

