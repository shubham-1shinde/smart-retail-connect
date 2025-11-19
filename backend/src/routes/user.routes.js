import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getDeliveryAddress,
    getCurrentUser,
} from "../controllers/user.controllers.js"

const router = Router();

router.route("/sign-up").post(registerUser)
router.route("/sign-in").post(loginUser)
router.route("/get-delivery-address").get(getDeliveryAddress)
router.route("/current-user").get(getCurrentUser)

export default router