import express from "express"
import {vendorRegister, vendorLogin} from "../controllers/vendorController.js";


const vendorRoutes = express.Router()

vendorRoutes.post('/register', vendorRegister)
vendorRoutes.post('/login', vendorLogin)


export default vendorRoutes;

