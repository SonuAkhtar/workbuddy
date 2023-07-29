import React from "react";

//components
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import TrustedBy from "../../components/TrustedBy/TrustedBy";
import Popular from "../../components/Popular/Popular";
import Business from "../../components/Business/Business";
import Features from "../../components/Features/Features";

const Homepage = () => {
  return (
    <section className="homepage">
      <Hero />

      <Category />

      <TrustedBy />

      <Popular />

      <Business />

      <Features />
    </section>
  );
};

export default Homepage;
