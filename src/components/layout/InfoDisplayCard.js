import "./InfoDisplayCard.css";
import "../../App.css";


const InfoDisplayCard = props => {
    return (
        <div className="card-wrapper info">   
            <p>{props.title}</p>
            <h2 className={props.textColor}>{props.amount.toLocaleString()}</h2>
            <p>+ {props.amountToday.toLocaleString()} today</p>
        </div>
    );
}

export default InfoDisplayCard;