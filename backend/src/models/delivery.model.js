import mongoose, {Schema} from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const deliverySchema = new Schema(
    {
        customer_phone:{
            type: Number,
            required: true,
        },
        shopkeeper_phone:{
            type: Number,
            required: true,
        },
        deliveryPartner_phone:{
            type: Number,
            required: true,
        },
        items: {
            type: [itemSchema],
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export const Delivery = mongoose.model("Delivery", deliverySchema)