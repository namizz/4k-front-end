import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick} // Close modal when clicking outside content
    >
      <div className="bg-[#fffffffd] rounded-lg p-6 w-80 text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
