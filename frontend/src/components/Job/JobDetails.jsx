import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">Job Details</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Title:</span>{" "}
            <span>{job.title || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Category:</span>{" "}
            <span>{job.category || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Country:</span>{" "}
            <span>{job.country || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">City:</span>{" "}
            <span>{job.city || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Location:</span>{" "}
            <span>{job.location || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Description:</span>{" "}
            <span>{job.description || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Job Posted On:</span>{" "}
            <span>{job.jobPostedOn || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Salary:</span>{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom || "N/A"} - {job.salaryTo || "N/A"}
              </span>
            )}
          </p>
        </div>

        {user && user.role !== "Employer" && (
          <Link
            to={`/application/${job._id}`}
            className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
