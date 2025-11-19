import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async (req, res) => {

    const {role, fullName, email, phone, address, city, shopName, vehicleType, licenseNo} = req.body
    

    if (
        [role, fullName, email, address, phone, city].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ phone }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or phone already exists")
    }
    

    const user = await User.create({
        role,
        fullName,
        email, 
        phone,
        address,
        city,
        shopName,
        vehicleType,
        licenseNo,
    })

    /*const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }*/

    return res.status(201).json(
        new ApiResponse(200, user, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{
    const {phone} = req.body 
    //console.log(email);

    if (!phone) {
        throw new ApiError(400, "phone is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
    // }

    const user = await User.findOne({
        phone
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    return res.status(201).json(
        new ApiResponse(200, user, "User logged in Successfully")
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        } 
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const getDeliveryAddress = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)
    console.log('hi',user)

    return res
    .status(200)
    .json(new ApiResponse(200, user, "User logged Out"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getDeliveryAddress,
    getCurrentUser,
}