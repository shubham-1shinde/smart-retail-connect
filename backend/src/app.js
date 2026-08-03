import express from "express"
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from './routes/user.routes.js'
import orderRouter from './routes/order.routes.js'
import deliveryRouter from './routes/delivery.routes.js'
import healthCheck from './routes/health.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/delivery", deliveryRouter)
app.use("/api/v1/health", healthCheck);

export { app }