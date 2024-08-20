import express from "express"
import { addFirm, upload, deleteFirmById } from "../controllers/firmController.js";
import verifyToken from './../middlewares/verifyToken.js';

const firmRoutes = express.Router()

firmRoutes.post('/add-firm', verifyToken, upload.single('image'), addFirm)
firmRoutes.delete('/:firmId', deleteFirmById)


firmRoutes.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});


export default firmRoutes;
