import { Router } from 'express';
import {
    createOrder,
    getCurrentCustomerOrders,
    getCurrentShopkepperOrders,
    updateOrder,
    confirmOrder,
} from "../controllers/order.controllers.js"

const router = Router();

router.route("/create-orders/:phone").post(createOrder)
router.route("/get-customer-orders/:phone").get(getCurrentCustomerOrders)
router.route("/get-shopkepper-orders/:phone").get(getCurrentShopkepperOrders)
router.route("/update-order/:orderBy").patch(updateOrder)
router.route("/confirm-order").post(confirmOrder)

export default router