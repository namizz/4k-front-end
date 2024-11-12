import "./editicon.css";
const EditIcon = (props) => {
  return (
    <div
      id="edit-section"
      onClick={() => {
        props.onClick(props.value);
      }}
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
