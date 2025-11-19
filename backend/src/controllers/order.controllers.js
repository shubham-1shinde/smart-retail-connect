import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    const { address, items, notes, orderCity } = req.body;
    const {phone} = req.params;

    // Create a new order
    const newOrder = new Order({
      address,
      items,
      notes,
      orderBy: phone,
      orderCity,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
};

export const getCurrentCustomerOrders = async (req, res) => {
  try {
    const { phone } = req.params;
    //const orders = await Order.find({phone}).sort({ createdAt: -1 });
    const orders = await Order.aggregate([
      { $match: { orderBy: Number(phone) } },
      { $sort: { createdAt: -1 } }
    ]);
    res.status(200).json({
      status: "success",
      data: {
        orders,
      }
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
} 

export const getCurrentShopkepperOrders = async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await User.findOne({phone});
    const orders = await Order.aggregate([
      { $match: { orderCity: user.city } },
      { $sort: { createdAt: -1 } } 
    ]);
    res.status(200).json({
      status: "success",
      data: {
        orders,
      }
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
}

export const updateOrder = async (req, res) => {
  try {
    const { shopkeeperPrices, totalPrice, shopkeeper, shopName } = req.body;
    const {orderBy} = req.params;
    //console.log("Updating order for:", orderBy);
    const order = await Order.findOne({orderBy});
    //console.log(order);

    const updatedOrder = await Order.findByIdAndUpdate( 
      order._id,
      {
        $push: {
          shopkeepers: { shopkeeper, prices: shopkeeperPrices, totalPrice, shopName }
        }
      },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        order: updatedOrder,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
};

export const confirmOrder = async (req, res) => {
  try {

    const { shopkeeper, orderBy } = req.body;

    const customer = await User.findOne({phone: orderBy});
    const user_shopkepeeper = await User.findOne({phone: shopkeeper});
    const order = await Order.findOne({orderBy});

    const city = customer.city;
    
    const deliveryPartner = await User.aggregate([
        { $match: { role: "Delivery Partner", city } },
        { $sample: { size: 1 } }
    ]);
    //console.log("Selected Delivery Partner id:", deliveryPartner[0]._id);
    //console.log("Selected Delivery Partner:", deliveryPartner);

    const resp = await User.findByIdAndUpdate(
      deliveryPartner[0]._id,
      {
        $set: {
          confirmedOrder: {
            customer_name: customer.fullName,
            customer_phone: customer.phone,
            customer_address: customer.address,
            shopName: user_shopkepeeper.shopName,
            shopkeeper_name: user_shopkepeeper.fullName,
            shopkeeper_phone: user_shopkepeeper.phone,
            shopAddress: user_shopkepeeper.address,
            city: customer.city,
            totalPrice: order.shopkeepers.find(sk => sk.shopkeeper == shopkeeper).totalPrice,
            delivery_status: "pending",
          }
        }
      },
      { new: true }
    );



    res.status(201).json({
      status: "success",
      resp
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to confirm order",
    });
  }
};
