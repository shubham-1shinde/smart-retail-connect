import express from "express"
import cors from "cors"
import multer from "multer"

const app = express();
const upload = multer();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


import userRouter from './routes/user.routes.js'
import orderRouter from './routes/order.routes.js'
import deliveryRouter from './routes/delivery.routes.js'

app.use("/api/v1/users", upload.none(), userRouter)
app.use("/api/v1/orders", upload.none(), orderRouter)
app.use("/api/v1/delivery", upload.none(), deliveryRouter)

export { app }