import mongoose  from "mongoose";

const vendorSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

const Vendor = mongoose.model("Vendor", vendorSchema)
export default Vendor;