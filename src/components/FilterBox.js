import React, { useState } from "react";

const FilterBox = (props) => {
  // State to track whether the box is active
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle active state
    props.onClick(); // Call the parent onClick function
  };

  return (
    <div
      className={`px-2 py-1 mr-1 text-filter border border-[#62A3E0] font-semibold rounded-xl bg-gradient-to-tl ${
        isActive
          ? "bg-gradient-to-tl from-blue-300 to-white text-[#3d76c0]" // Active styles
          : "bg-gradient-to-tl from-blue-100 to-white text-[#5b8ecf]" // Default styles
      }`}
      onClick={handleClick}
    >
      {props.dept}
    </div>
  );
};

export default FilterBox;
