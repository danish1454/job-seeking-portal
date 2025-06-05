import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">ALL AVAILABLE JOBS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div
                key={element._id}
                className="card bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <p className="text-xl font-semibold text-gray-800 mb-2">{element.title}</p>
                <p className="text-gray-600 mb-1">{element.category}</p>
                <p className="text-gray-600 mb-4">{element.country}</p>
                <Link
                  to={`/job/${element._id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Job Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
