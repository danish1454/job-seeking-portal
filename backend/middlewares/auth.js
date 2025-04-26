import {catchAsyncError} from './catachAsyncError.js'
import ErrorHandler from './error.js'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'

export const isAuthorised = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("user not authorised", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id)
    next()
})