import mongoose  from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide a job title"],
        minLength: [3, "Job title must contain atleast 3 characters"],
        maxLength: [50, "Job title cannot exceed 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a job description"],
        minLength: [10, "Job description must contain atleast 10 characters"],
        maxLength: [350, "Job description cannot exceed 350 characters"],
    },
    category: {
        type: String,
        required: [true, "job category is required"],
    },
    country: {
        type: String,
        required: [true, "Job country is required"],
    },
    city: {
        type: String,
        required: [true, "Job city is required"],
    },
    location: {
        type: String,
        required: [true, "Please provide exact Job location "],
        minLength: [10, "Job location must contain atleast 50 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Fixed Salary must contain at least 4 digits!"],
        maxLength: [9,  "Fixed Salary cannot exceed 9 digits!"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "SalaryFrom must contain at least 4 digits!"],
        maxLength: [9,  "SalaryFrom cannot exceed 9 digits!"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "SalaryTo must contain at least 4 digits!"],
        maxLength: [9,  "SalaryTo cannot exceed 9 digits!"]
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now(), 
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

export const Job = mongoose.model("Job", jobSchema);