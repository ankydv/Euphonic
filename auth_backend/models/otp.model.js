import mongoose,{Schema} from "mongoose";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires after 5 minutes (300 seconds)
    }
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;