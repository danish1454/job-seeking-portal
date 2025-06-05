import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg p-4 max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-3xl font-bold text-gray-700 hover:text-gray-900"
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="resume"
          className="max-w-full max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  );
};

export default ResumeModal;
