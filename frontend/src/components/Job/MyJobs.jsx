import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === jobId ? { ...job, [field]: value } : job))
    );
  };

  return (
    <section className="myJobs page py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="space-y-8">
            {myJobs.map((element) => (
              <div
                key={element._id}
                className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6"
              >
                {/* Left Content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <label className="block text-gray-700 font-semibold">Title:</label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.title}
                      onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-gray-700 font-semibold">Country:</label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.country}
                      onChange={(e) => handleInputChange(element._id, "country", e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-gray-700 font-semibold">City:</label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.city}
                      onChange={(e) => handleInputChange(element._id, "city", e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-gray-700 font-semibold">Category:</label>
                    <select
                      disabled={editingMode !== element._id}
                      value={element.category}
                      onChange={(e) => handleInputChange(element._id, "category", e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    >
                      <option value="Graphics & Design">Graphics & Design</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Frontend Web Development">Frontend Web Development</option>
                      <option value="MERN Stack Development">MERN STACK Development</option>
                      <option value="Account & Finance">Account & Finance</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Video Animation">Video Animation</option>
                      <option value="MEAN Stack Development">MEAN STACK Development</option>
                      <option value="MEVN Stack Development">MEVN STACK Development</option>
                      <option value="Data Entry Operator">Data Entry Operator</option>
                    </select>
                  </div>

                  <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="block text-gray-700 font-semibold">Salary:</label>
                    {element.fixedSalary ? (
                      <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.fixedSalary}
                        onChange={(e) =>
                          handleInputChange(element._id, "fixedSalary", e.target.value)
                        }
                        className={`w-full border rounded px-3 py-2 focus:outline-none ${
                          editingMode === element._id
                            ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                            : "bg-gray-100 cursor-not-allowed"
                        }`}
                      />
                    ) : (
                      <div className="flex gap-4">
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.salaryFrom}
                          onChange={(e) =>
                            handleInputChange(element._id, "salaryFrom", e.target.value)
                          }
                          className={`flex-1 border rounded px-3 py-2 focus:outline-none ${
                            editingMode === element._id
                              ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                              : "bg-gray-100 cursor-not-allowed"
                          }`}
                          placeholder="From"
                        />
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.salaryTo}
                          onChange={(e) =>
                            handleInputChange(element._id, "salaryTo", e.target.value)
                          }
                          className={`flex-1 border rounded px-3 py-2 focus:outline-none ${
                            editingMode === element._id
                              ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                              : "bg-gray-100 cursor-not-allowed"
                          }`}
                          placeholder="To"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 col-span-1 md:col-span-1">
                    <label className="block text-gray-700 font-semibold">Expired:</label>
                    <select
                      disabled={editingMode !== element._id}
                      value={element.expired}
                      onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Description:</label>
                    <textarea
                      rows={5}
                      disabled={editingMode !== element._id}
                      value={element.description}
                      onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                      className={`w-full border rounded px-3 py-2 resize-none focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Location:</label>
                    <textarea
                      rows={5}
                      disabled={editingMode !== element._id}
                      value={element.location}
                      onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                      className={`w-full border rounded px-3 py-2 resize-none focus:outline-none ${
                        editingMode === element._id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-400"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col justify-between gap-4">
                  <div className="flex gap-2">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                          title="Save"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleDisableEdit}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                          title="Cancel"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center mt-12 text-lg">
            You've not posted any job or may be you deleted all of your jobs!
          </p>
        )}
      </div>
    </section>
  );
};

export default MyJobs;
