import "../components/inputbox.css";

const TextBox = (props) => {
  return (
    <div className="input" id={`${props.name}Box`}>
      <p className="boxname">{props.p}</p>
      <textarea
        className="inputbox"
        id={`${props.name}Text`}
        name={props.name}
        value={props.value}
        onChange={props.change}
      />
    </div>
  );
};

export default TextBox;
