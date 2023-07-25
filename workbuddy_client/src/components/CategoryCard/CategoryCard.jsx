import React from "react";
import { useNavigate } from "react-router-dom";
import "./categoryCard.scss";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="categoryCard"
      style={{
        background: item.bgColor,
        boxShadow: `0 2px 5px ${item.bgColor}`,
      }}
    >
      <span className="title">{item.title}</span>
      <div className="image">
        <img src={item.image} alt="image" />
      </div>
      <span className="desc">{item.desc}</span>
      <button onClick={() => navigate("/gigs?cat=design")}>Explore</button>
    </div>
  );
};

export default CategoryCard;
