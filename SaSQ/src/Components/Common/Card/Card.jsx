import "./Card.css";

function Card(props) {
  let cardLabel = props.label;
  let cardNumber = props.number;
  let cardIcon = props.icon;
  let numberColor = props.numberColor;

  let numberClassName = "card-number text-" + numberColor;

  return (
    <div
      className="card"
      role="group"
      aria-label={cardLabel + ": " + cardNumber}
    >
      <p className="card-label">{cardLabel}</p>
      <div className="card-content">
        <span className="card-icon" aria-hidden="true">
          {cardIcon}
        </span>
        <p className={numberClassName}>{cardNumber}</p>
      </div>
    </div>
  );
}

export default Card;
