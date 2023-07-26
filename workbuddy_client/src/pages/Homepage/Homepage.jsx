import React from "react";
import { category, populars } from "../../data";

//components
import Hero from "../../components/Hero/Hero";
import Slide from "../../components/Slide/Slide";
import Features from "../../components/Features/Features";
import TrustedBy from "../../components/TrustedBy/TrustedBy";
import Business from "../../components/Business/Business";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import PopularCard from "../../components/PopularCard/PopularCard";

//style
import "./homepage.scss";

const Homepage = () => {
  return (
    <section className="homepage">
      <Hero />

      <Slide slidesToShow={4} arrowsScroll={4}>
        {category.map((card) => (
          <CategoryCard key={card.id} item={card} />
        ))}
      </Slide>

      <TrustedBy />

      <div className="popular">
        <main>
          {populars.map((card) => (
            <PopularCard key={card.id} item={card} />
          ))}
        </main>
      </div>

      <Business />

      <Features />
    </section>
  );
};

export default Homepage;
