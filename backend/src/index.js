import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import connectDB from "./db/database.js";
import { app } from "./app.js";





connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})






// all imports 
/*
MONGODB_URI=mongodb+srv://shubham_1shinde:shubham8767579064@cluster0.x0gjftq.mongodb.net

import express from "express";
import cors from "cors";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import mongoose, {Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
const app = express();

// db connection
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/doctors_database`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// app setting

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// utils

class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ 
    storage, 
})

import { config } from 'dotenv';
config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null


        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error("Error uploading file to cloudinary:", error);
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

// models

const doctorSchema = new Schema(
    {
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
        profileImg: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
            min: 0
        },
        languages:{
            type: String,
            required: true,
        },
        expertise: {
            type: String,
            required: true,
        },
        fee: {
            type: Number,
            required: true,
            min: 0
        },
        interests: {
            type: [String],
            default: []
        },

    },
    {
        timestamps: true
    }
)
const Doctor = mongoose.model("Doctor", doctorSchema)

// controllers+routes in one

app.get("/api/v1/doctors/",async (req, res) => {

    const doctors = await Doctor.aggregate([
        {
            $match:{}
        },
    ])


    return res
    .status(200)
    .json(
        new ApiResponse(200, doctors, "all doctors")
    )
});

app.post("/api/v1/doctors/doctor-register-form", upload.fields([
        {
            name: "profileImg",
            maxCount: 1
        },
    ]), async (req, res) => {

    const  {fullName, email, mobile, address, experience, languages, interests, expertise, fee}  = req.body;

    const profileImgLocalPath = req.files?.profileImg[0]?.path;

    if (!profileImgLocalPath) {
        throw new ApiError(400, "profileImg file is required")
    }

    const profileImg = await uploadOnCloudinary(profileImgLocalPath)

    if (!profileImg) {
        throw new ApiError(400, "profileImg file is required beacause not uploaded in cloudinary")
    }
   

    const doctor = await Doctor.create({
        fullName,
        email,
        profileImg: profileImg.url,
        mobile,
        address,
        experience,
        languages,
        interests,
        expertise,
        fee,
    })
    if(!doctor){
        throw new ApiError(400, "doctor not registered");
    }

    return res.status(200).json(
        new ApiResponse(200, doctor, "doctor added successfully")
    )
});

*/

