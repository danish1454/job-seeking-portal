import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchApplications = async () => {
      try {
        const url =
          user && user.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const res = await axios.get(url, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load applications");
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      {user && user.role === "Job Seeker" ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6">My Applications</h1>
          {applications.length === 0 ? (
            <h4 className="text-center text-gray-500">No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4 className="text-center text-gray-500">No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard key={element._id} element={element} openModal={openModal} />
            ))
          )}
        </div>
      )}

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center border border-gray-300 rounded-lg p-5 mb-5 bg-gray-50 shadow-sm">
      <div className="flex-1 space-y-1 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>

      <div className="flex-shrink-0 ml-0 md:ml-6 mt-4 md:mt-0 cursor-pointer">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="max-w-[150px] max-h-[180px] object-contain rounded border border-gray-300 shadow-sm hover:shadow-md transition"
        />
      </div>

      <div className="ml-auto mt-4 md:mt-0">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center border border-gray-300 rounded-lg p-5 mb-5 bg-gray-50 shadow-sm">
      <div className="flex-1 space-y-1 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="flex-shrink-0 ml-0 md:ml-6 mt-4 md:mt-0 cursor-pointer">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="max-w-[150px] max-h-[180px] object-contain rounded border border-gray-300 shadow-sm hover:shadow-md transition"
        />
      </div>
    </div>
  );
};
