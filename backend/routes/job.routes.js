import express from 'express'
import {deleteJob, getAllJobs, getMyJobs, postJob, updateJob} from '../controllers/job.controller.js'
import {isAuthorised} from '../middlewares/auth.js'

const router = express.Router()

router.get("/getall", getAllJobs)
router.post("/post",isAuthorised, postJob)
router.get("/getmyjobs",isAuthorised, getMyJobs)
router.put("/update/:id",isAuthorised, updateJob)
router.delete("/delete/:id",isAuthorised, deleteJob)

export default router