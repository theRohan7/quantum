import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../Database/user.model.js";



const registerUser = asyncHandler( async (req, res) => {
    const  { name, email, password, DOB } = req.body;

    if(!name || name === ''){
        throw new ApiError(400, "Name is required")
    }
    if(!email || !email.includes('@') ){
        throw new ApiError(400, "Email is required")
    }
    if(!password || password.length < 6){
        throw new ApiError(400, "Password should be greater than 6 characters")
    }

    
    const  existedUser = await User.findOne({ email })

    if(existedUser){
        throw new ApiError(409, "User with this email already exists.")
    }

    const user = await User.create({
        name,
        email,
        password,
        DOB
    })

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering.") 
    }

    return res
    .status(201)
    .json(
        new ApiResponse( 201, createdUser, "User registered successfully.")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || email === ''){
        throw new ApiError(400, "Email is required")
    }

    if(!password || password === '') {
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({ email })

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const checkPassword = await user.isPasswordCorrect(password)

    if(!checkPassword){
        throw new ApiError(500, "Invalid user credentials")
    }

    const token = await user.generateToken()
    await user.save({validateBeforeSave: false})

    const loggedinUser = await User.findById(user._id).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse( 200, {user:loggedinUser, token}, "user logged in successfully." )
    )
})

export { registerUser, loginUser }