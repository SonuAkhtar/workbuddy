import React from "react";
import { useNavigate } from "react-router-dom";
import "./categoryCard.scss";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="categoryCard">
      <div className="image">
        <img src={item.image} alt="image" />
      </div>
      <span className="title" style={{ WebkitTextStrokeColor: item.bgColor }}>
        {item.title}
      </span>

      <div className="info" style={{ backgroundColor: item.bgColor }}>
        <span className="desc">{item.desc}</span>
        <button
          style={{ color: item.bgColor }}
          onClick={() => navigate(`/services?category=${item.search}`)}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
