import React from "react";
import { Link } from "react-router-dom";
import "./popularCard.scss";

const PopularCard = ({ item }) => {
  return (
    <Link to="/" className="link">
      <div className="popularCard">
        <div className="shape" style={{ background: item.bgColor }}></div>
        <img src={item.image} alt="image" />
        <div className="info">
          <h2>{item.username}</h2>
          <p>{item.cat}</p>
          <button>Connect</button>
        </div>
      </div>
    </Link>
  );
};

export default PopularCard;
