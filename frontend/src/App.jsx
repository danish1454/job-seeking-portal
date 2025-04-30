import React from 'react'
import "./App.css"
import {Context} from './main.jsx'
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Job/Jobs.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import MyJobs from './components/Job/MyJobs.jsx'
import PostJobs from './components/Job/PostJob.jsx'
import Application from './components/Application/Application.jsx'
import MyApplication from './components/Application/MyApplications.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <> 
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App