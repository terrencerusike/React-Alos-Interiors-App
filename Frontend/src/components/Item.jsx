import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Itemm = (props) => {
  return (
    <div className="itemm">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt={props.name}
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-old">R{props.new_price + 20}</div>
        <div className="item-price-new">R{props.new_price}</div>
      </div>
    </div>
  );
};

export default Itemm;
