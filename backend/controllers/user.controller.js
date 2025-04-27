import {catchAsyncError} from '../middlewares/catachAsyncError.js'
import ErrorHandler from '../middlewares/error.js'
import { User } from '../models/user.model.js'
import {sendToken} from '../utils/jwtToken.js'

export const register = catchAsyncError (async(req, res, next)=>{
    if (!req.body) {
        return next(new ErrorHandler("Please fill all the required details", 400));
    }
    const {name, email, phone, role, password} = req.body
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill all the required details"))
    }
    const isEmail = await User.findOne({email})
    if(isEmail){
        return next(new ErrorHandler("User already exists"))
    }
    const user = await User.create({
        name, 
        email,
        phone,
        role,
        password,
    });
    sendToken(user, 200, res, "user registered successfully")
})

export const login = catchAsyncError(async(req, res, next)=>{

    if (!req.body) {
        return next(new ErrorHandler("Please fill all the required details", 400));
    }
    const {email, password, role} = req.body;
    
    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide required details", 404))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("invalid Email or password", 400))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid Email or password", 400))
    }
    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found !", 400))
    }
    sendToken(user, 200, res, "user logged in successfully")
})
