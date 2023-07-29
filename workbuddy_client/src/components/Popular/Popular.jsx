import React from "react";
import { populars } from "../../data";
import PopularCard from "../PopularCard/PopularCard";
import "./popular.scss";

const Popular = () => {
  return (
    <div className="popular">
      <h1>
        Meet our<span>Popular Experts</span>across the tech
      </h1>

      <main>
        {populars.map((card) => (
          <PopularCard key={card.id} item={card} />
        ))}
      </main>
    </div>
  );
};

export default Popular;
