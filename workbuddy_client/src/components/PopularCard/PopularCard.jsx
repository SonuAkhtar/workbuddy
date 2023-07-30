import React from "react";
import { useNavigate } from "react-router-dom";
import "./popularCard.scss";

const PopularCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="popularCard">
      <div className="shape" style={{ background: item.bgColor }}></div>
      <div className="image">
        <img src={item.image} alt="image" />
      </div>
      <div className="info">
        <h2>{item.username}</h2>
        <p>{item.cat}</p>
        <button onClick={() => navigate("/")}>Connect</button>
      </div>
    </div>
  );
};

export default PopularCard;
