import express from 'express'
import {isAuthorised} from "../middlewares/auth.js"
import {employerGetAllApplications, jobSeekerDeleteApplications, jobSeekerGetAllApplications} from '../controllers/application.controller.js'

const router = express.Router()

router.get("/jobseeker/getll", isAuthorised, jobSeekerGetAllApplications)
router.get("/employer/getall", isAuthorised, employerGetAllApplications)
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplications)

export default router