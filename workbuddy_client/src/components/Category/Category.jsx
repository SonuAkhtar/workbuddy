import React from "react";

// Libraries
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components
import CategoryCard from "../CategoryCard/CategoryCard";
import { category } from "../../data";

import "./category.scss";

const Category = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="category">
      <main>
        <div className="header">
          <span>Explore the</span>
          <h1>Latest Category</h1>
          <span>as per your need</span>
        </div>

        <div className="content">
          <Slider {...settings}>
            {category.map((card) => (
              <CategoryCard key={card.id} item={card} />
            ))}
          </Slider>
        </div>
      </main>
    </div>
  );
};

export default Category;
