import express from "express"
import { firmController, upload } from "../controllers/firmController.js";
import verifyToken from './../middlewares/verifyToken.js';

const firmRoutes = express.Router()

firmRoutes.post('/add-firm', verifyToken, upload.single('image'), firmController)


export default firmRoutes;
