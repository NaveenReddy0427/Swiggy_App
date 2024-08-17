import Vendor from "../models/Vendor.js"
import Firm from "../models/Firm.js"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const firmController = async(req, res)=>{
    try {
        const {firmName, area, category, region, offer} = req.body
        const image = req.file? req.file.filename: undefined;

        const vendor = await Vendor.findById(req.vendorId)
        if(!vendor){
            return res.status(404).json({message: "Vendor not found"})
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        const savedFirm = await firm.save()
        vendor.firm.push(savedFirm)
        await vendor.save()

        return res.status(200).json({message: "Firm created successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export { firmController, deleteFirmById, upload };