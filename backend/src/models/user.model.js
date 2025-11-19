import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
            lowecase: true,
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            lowecase: true,
            required: true,
        },
        shopName: {
            type: String,
            lowecase: true,
        },
        vehicleType: {
            type: String,
            lowecase: true,
        },
        licenseNo: {
            type: String,
            lowecase: true,
        },
        otp: {
            type: String,
        },
        otp_expire: {
            type: Date,
        },
        confirmedOrder: {
            type: {
                customer_name: String,
                customer_phone: String,
                customer_address: String,
                shopName: String,
                shopkeeper_name: String,
                shopkeeper_phone: String,
                shopAddress: String,
                city: String,
                totalPrice: Number,
                delivery_status: {
                    type: String,
                    enum: ["pending", "accepted", "delivered"],
                    default: "pending",
                },
            },
        },

    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)