import React from "react";
import { populars } from "../../data";
import PopularCard from "../PopularCard/PopularCard";
import "./popular.scss";

const Popular = () => {
  return (
    <div className="popular">
      <main>
        <div className="header">
          <span>Meet our</span>
          <h1>Popular Experts</h1>
          <span>across the tech</span>
        </div>

        <div className="content">
          {populars.map((card) => (
            <PopularCard key={card.id} item={card} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Popular;
