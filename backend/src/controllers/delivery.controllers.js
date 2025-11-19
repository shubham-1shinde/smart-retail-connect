import { Delivery } from "../models/delivery.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const getOrder = async (req, res) => {
  try {

    const { phone } = req.params;

    const order = await User.findOne({phone});

    return res
    .status(200)
    .json(new ApiResponse(200, order.confirmedOrder, "Delivery Order fetched successfully"));

  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to confirm order",
    });
  }
};

export const deliveryDone = async (req, res) => {
  try {
    const { customer_phone, shopkeeper_phone, deliveryPartner_phone } = req.body;

    const deliveryboy = await User.findOne({phone: deliveryPartner_phone});
    const order = await Order.findOne({orderBy: customer_phone});

    const delivery = await Delivery.create({
      customer_phone,
      shopkeeper_phone,
      deliveryPartner_phone,
      items: order.items,
    });


    await User.updateOne(
      {_id: deliveryboy._id},
      { $unset: { confirmedOrder: "" } }
    );

    await Order.findByIdAndDelete(order._id);

    return res
    .status(200)
    .json(new ApiResponse(200, delivery, "Order deliverded successfully"));

  } catch (error) {
    console.error("Error done order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to confirm order",
    });
  }
};

