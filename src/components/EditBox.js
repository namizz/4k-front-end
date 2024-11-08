import "./editbox.css";

const EditBox = (props) => {
  return (
    <div className="editbox" id={`${props.name}EditBox`}>
      <p className="editboxname">{props.p}:</p>
      <input
        className="editboxinput"
        type={props.type || "text"}
        id={`${props.name}Text`}
        name={props.name}
        value={props.value}
        onChange={props.change}
        readOnly={!props.edit}
        style={
          props.edit
            ? { backgroundColor: "#fdfefe", border: "1px solid #e49723" }
            : null
        }
      />
      <p style={{ display: props.display || "none" }} className="message">
        ⚠️ Please enter {props.name}
      </p>
      <p
        style={props.msg == "" ? { display: "none" } : { display: "flex" }}
        className="message"
      >
        {props.msg}
      </p>
    </div>
  );
};

export default EditBox;
