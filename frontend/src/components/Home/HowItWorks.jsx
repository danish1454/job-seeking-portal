import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create Account",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.",
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Find a Job/Post a Job",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.",
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Apply For Job/Recruit Suitable Candidates",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-12">
          How JobZee Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map(({ id, icon, title, desc }) => (
            <div
              key={id}
              className="bg-white dark:bg-purple-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-purple-400 transition-shadow duration-300"
            >
              <div className="text-purple-600 dark:text-purple-300 text-5xl mb-4">
                {icon}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {title}
              </h4>
              <p className="text-gray-600 dark:text-purple-200">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
