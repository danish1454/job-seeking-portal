import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          </div>
          <p className="text-gray-600">Login to your account and start your journey</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Select */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Login As</label>
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
              Login
            </button>
          </form>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-indigo-600 font-semibold hover:underline">
              Register Now
            </Link>
          </p>
        </div>

        {/* Right side: Banner Image */}
        <div className="w-1/2 bg-indigo-100 flex items-center justify-center">
          <img
            src="/login.png"
            alt="login banner"
            className="object-cover h-full w-full rounded-r-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
