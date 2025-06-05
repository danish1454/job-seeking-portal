import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    { id: 1, title: "Graphics & Design", subTitle: "305 Open Positions", icon: <MdOutlineDesignServices /> },
    { id: 2, title: "Mobile App Development", subTitle: "500 Open Positions", icon: <TbAppsFilled /> },
    { id: 3, title: "Frontend Web Development", subTitle: "200 Open Positions", icon: <MdOutlineWebhook /> },
    { id: 4, title: "MERN STACK Development", subTitle: "1000+ Open Positions", icon: <FaReact /> },
    { id: 5, title: "Account & Finance", subTitle: "150 Open Positions", icon: <MdAccountBalance /> },
    { id: 6, title: "Artificial Intelligence", subTitle: "867 Open Positions", icon: <GiArtificialIntelligence /> },
    { id: 7, title: "Video Animation", subTitle: "50 Open Positions", icon: <MdOutlineAnimation /> },
    { id: 8, title: "Game Development", subTitle: "80 Open Positions", icon: <IoGameController /> },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Popular Categories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map(({ id, icon, title, subTitle }) => (
            <div
              key={id}
              className="flex flex-col items-center bg-gray-50 dark:bg-purple-800 rounded-xl p-6 shadow-md hover:shadow-purple-400 transition-shadow duration-300 cursor-pointer"
            >
              <div className="text-purple-600 dark:text-purple-300 text-5xl mb-4">
                {icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {title}
              </h4>
              <p className="text-gray-600 dark:text-purple-200">{subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
