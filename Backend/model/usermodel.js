import mongoose from "mongoose";
const userschenma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {},
    },
}, { timestamps: true, minimize: false });

const User = mongoose.model("User", userschenma);
export default User;
