
import express from "express"
import { addProduct, upload, getProductByFirm, deleteProductById } from "../controllers/productController.js"

const productRoutes = express.Router()
productRoutes.post("/add-product/:firmId", upload.single("image"), addProduct)
productRoutes.get("/:firmId/products", getProductByFirm)
productRoutes.delete("/:productId'", deleteProductById)

productRoutes.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

export default productRoutes;