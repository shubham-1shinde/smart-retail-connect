import mongoose from "mongoose";

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

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [itemSchema], // Array of items
      required: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    orderBy:{
      type: Number,
      required: true,
    },
    orderCity:{
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    shopkeepers: [{
      shopkeeper: {
        type: Number,
      },
      shopName:{
        type: String,
      },
      prices: {
        type: Map,
        of: Number,
        default: {},
      },
      totalPrice: {
        type: Number,
        default: 0,
      }
    }],
    finalizedShopleeper:{
      type: Number,
    }

  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const Order = mongoose.model("Order", orderSchema);
