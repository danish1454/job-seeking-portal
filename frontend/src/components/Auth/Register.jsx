import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main.jsx";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-6">
      <div className="bg-white rounded-3xl shadow-xl flex max-w-5xl w-full overflow-hidden">
        {/* Left side: Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-3">
            <img src="/JobZeelogo.png" alt="logo" className="w-14 h-14" />
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          </div>
          <p className="text-gray-600">Register now and join our community</p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Role Select */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Register As</label>
              <div className="relative">
                <select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FaPencilAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <MdOutlineMailOutline className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FaPhoneFlip className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <RiLock2Fill className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-600 font-semibold hover:underline">
              Login Now
            </Link>
          </p>
        </div>

        {/* Right side: Banner Image */}
        <div className="w-1/2 bg-indigo-100 flex items-center justify-center">
          <img
            src="/register.png"
            alt="register banner"
            className="object-cover h-full w-full rounded-r-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
