import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-5xl">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Top Companies
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {companies.map(({ id, icon, title, location, openPositions }) => (
            <div
              key={id}
              className="flex flex-col justify-between bg-white dark:bg-purple-900 rounded-xl shadow-lg p-6 hover:shadow-purple-500 transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-purple-600 dark:text-purple-300 text-5xl">
                  {icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-purple-200">
                    {location}
                  </p>
                </div>
              </div>
              <button
                className="self-start bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5 py-2 font-medium transition-colors"
                aria-label={`Open Positions at ${title}`}
              >
                Open Positions: {openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
