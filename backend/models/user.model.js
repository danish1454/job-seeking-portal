import mongoose from 'mongoose'
import  validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Please provide your name"],
        minLength : [3, "Name must contain atleast 3 charaters"],
        maxLength: [30, "Name cannot exceed 30 charaters"]    
    }, 
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "Please provide a number"]
    },
    password: {
        type: String,
        required: [true, "Please provide a phone number"],
        minLength: [5, "password must contain atleast 5 charaters"],
        maxLength: [32, "password cannot exceed 32 characters"],
        select: false,
    },
    role: {
        type: String, 
        required: [true, "Please provide you role"],
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

//Hashing
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// Comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//geenrate JWT token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User", userSchema)