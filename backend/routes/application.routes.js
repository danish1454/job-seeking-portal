import express from 'express'
import {isAuthorised} from "../middlewares/auth.js"
import {employerGetAllApplications, jobSeekerDeleteApplications, jobSeekerGetAllApplications, postApplication} from '../controllers/application.controller.js'

const router = express.Router()

router.get("/jobseeker/getall", isAuthorised, jobSeekerGetAllApplications)
router.get("/employer/getall", isAuthorised, employerGetAllApplications)
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplications)
router.post("/post", isAuthorised, postApplication)

export default router