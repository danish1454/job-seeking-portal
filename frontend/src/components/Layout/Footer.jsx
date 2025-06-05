import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) return null; // hide footer if not authorized

  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-800 to-purple-900 text-gray-300 py-6 px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="text-sm">&copy; All Rights Reserved By CodeWithZeeshu.</div>
      <div className="flex space-x-6 mt-4 md:mt-0 text-xl">
        <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
          <FaFacebookF />
        </Link>
        <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
          <FaYoutube />
        </Link>
        <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
          <FaLinkedin />
        </Link>
        <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
