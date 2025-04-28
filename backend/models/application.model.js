import { application } from "express";
import mongoose from "mongoose";
import validator from 'validator'

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minlength: [3, "Name must contain atleast 3 charaters"],
        maxlength: [30, "Name cannot exceed 30 charaters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validator: [validator.isEmail, "Please provide a valid email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your cover letter"]
    },
    phone: {
        type: String,
        required: [true, "Please provide your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please provide your Address"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    applicant_id: {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Job Seeker", "Employer"],
            required: true,
        }
    },
    employer_id: {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true,
        }
    }
})

export const Application = mongoose.model("Application", applicationSchema);