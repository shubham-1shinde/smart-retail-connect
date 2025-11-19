import { Router } from 'express';
import {
getOrder,
deliveryDone,
} from "../controllers/delivery.controllers.js"

const router = Router();

router.route("/get-delivery-order/:phone").get(getOrder)
router.route("/delivery-done").post(deliveryDone)

export default router