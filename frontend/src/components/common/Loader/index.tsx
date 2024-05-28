import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
