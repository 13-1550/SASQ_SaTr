import "./Button.css";

function Button(props) {
  let buttonText = props.text;
  let buttonType = props.type;
  let fullClassName = "btn btn-" + buttonType;

  return <button className={fullClassName}>{buttonText}</button>;
}

export default Button;
