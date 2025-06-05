import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  // Auto close mobile menu when route changes
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  if (!isAuthorized) return null;

  return (
    <nav
      className={`bg-gradient-to-r from-indigo-700 via-purple-800 to-purple-900 text-gray-100 shadow-md fixed w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/JobZee-logos__white.png" alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center font-semibold">
          <li>
            <Link to="/" className="hover:text-indigo-300 transition">HOME</Link>
          </li>
          <li>
            <Link to="/job/getall" className="hover:text-indigo-300 transition">ALL JOBS</Link>
          </li>
          <li>
            <Link to="/applications/me" className="hover:text-indigo-300 transition">
              {user?.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user?.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" className="hover:text-indigo-300 transition">POST NEW JOB</Link>
              </li>
              <li>
                <Link to="/job/me" className="hover:text-indigo-300 transition">VIEW YOUR JOBS</Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition font-semibold"
            >
              LOGOUT
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <GiHamburgerMenu
            size={24}
            className="cursor-pointer text-gray-100"
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <ul className="md:hidden bg-gradient-to-r from-indigo-700 via-purple-800 to-purple-900 text-gray-100 space-y-4 p-6 font-semibold">
          <li><Link to="/" className="block hover:text-indigo-300 transition">HOME</Link></li>
          <li><Link to="/job/getall" className="block hover:text-indigo-300 transition">ALL JOBS</Link></li>
          <li>
            <Link to="/applications/me" className="block hover:text-indigo-300 transition">
              {user?.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user?.role === "Employer" && (
            <>
              <li><Link to="/job/post" className="block hover:text-indigo-300 transition">POST NEW JOB</Link></li>
              <li><Link to="/job/me" className="block hover:text-indigo-300 transition">VIEW YOUR JOBS</Link></li>
            </>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition font-semibold"
            >
              LOGOUT
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
