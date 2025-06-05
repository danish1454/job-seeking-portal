import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 text-white py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find a job that suits <br /> your interests and skills
          </h1>
          <p className="text-purple-200 max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
            facere mollitia!
          </p>
        </div>

        {/* Hero Image */}
        <div className="flex-1 max-w-lg">
          <img
            src="/heroS.jpg"
            alt="hero"
            className="rounded-lg shadow-lg border-4 border-purple-600"
          />
        </div>
      </div>

      {/* Details Cards */}
      <div className="container mx-auto px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {details.map(({ id, icon, title, subTitle }) => (
          <div
            key={id}
            className="bg-purple-700 bg-opacity-70 rounded-xl p-6 flex items-center space-x-4 hover:bg-purple-600 transition duration-300 cursor-default shadow-lg"
          >
            <div className="text-4xl text-purple-300">{icon}</div>
            <div>
              <p className="text-2xl font-semibold">{title}</p>
              <p className="text-purple-300 uppercase tracking-wide">{subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
