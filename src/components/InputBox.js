import "../components/inputbox.css";

const InputBox = (props) => {
  return (
    <div className="input" id={`${props.name}Box`}>
      <p className="boxname">
        {props.p}
        {props.display ? <span id="required">*</span> : ""}
      </p>
      <input
        className="inputbox"
        type={props.type || "text"}
        id={`${props.name}Text`}
        name={props.name}
        value={props.value}
        onChange={props.change}
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

export default InputBox;
