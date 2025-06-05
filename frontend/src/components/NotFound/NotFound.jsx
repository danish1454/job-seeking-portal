import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page notfound flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <img
          src="/notfound.png"
          alt="Page Not Found"
          className="mx-auto mb-8 w-64 h-64 object-contain"
        />
        <h1 className="text-5xl font-extrabold text-purple-700 dark:text-purple-400 mb-4">
          404
        </h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Oops! The page you’re looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
