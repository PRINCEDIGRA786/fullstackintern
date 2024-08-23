import React from 'react';

const Modal = ({ isOpen, closeModal, setQuery }) => {
  if (!isOpen) return null;

  const filters = [
    "End Year",
    "Topics",
    "Sector",
    "Region",
    "PEST",
    "Source",
    "SWOT",
    "Country",
   
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg space-y-4 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Select a Filter</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600"
              onClick={() => {
               setQuery( filter.toLowerCase().replace(/\s/g, '_'))

                closeModal();
              }}
            >
              {filter}
            </button>
          ))}
        </div>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
