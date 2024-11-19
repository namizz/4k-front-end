import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./editicon.css";

const EditIcon = (props) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    console.log(props.phone);
    // Use navigate to redirect to the update page with the phone number query parameter
    navigate(`/update?phone=${props.phone}`);
  };

  return (
    <div
      id="edit-section"
      onClick={props.value ? () => props.onClick(props.value) : handleClick}
      style={props.width ? { width: props.width, fontSize: "1vw" } : null}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/8748/8748504.png"
        alt="edit-icon"
        id="edit-icon"
      />
      <p id="edit-text">Edit</p>
    </div>
  );
};

export default EditIcon;
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// import "./editicon.css";

// const EditIcon = (props) => {
//   const navigate = useNavigate(); // Initialize navigate

//   const handleClick = () => {
//     // Use navigate to redirect to the update page with the phone number query parameter
//     navigate(`/update?phone=${props.phone}`);
//   };

//   return (
//     <div
//       id="edit-section"
//       onClick={handleClick} // Use handleClick for navigation
//       style={props.width ? { width: props.width, fontSize: "1vw" } : null}
//     >
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/8748/8748504.png"
//         alt="edit-icon"
//         id="edit-icon"
//       />
//       <p id="edit-text">Edit</p>
//     </div>
//   );
// };

// export default EditIcon;
