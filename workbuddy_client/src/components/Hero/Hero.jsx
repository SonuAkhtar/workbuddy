import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.scss";

const Hero = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSeaerch = () => {
    navigate(`/services?search=${input}`);
  };

  return (
    <section className="hero">
      <main>
        <div className="left">
          <h1>
            Get the best <span>Freelancers</span> for your business.
          </h1>
          <div className="search">
            <div className="searchInput">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder='Try "Mobile App Development"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSeaerch}>Search</button>
          </div>
          <div className="frequent">
            <span>Frequent Searched:</span>
            <button onClick={() => navigate("/services?search=uiux")}>
              UI/UX Design
            </button>
            <button onClick={() => navigate("/services?search=web")}>
              Web Development
            </button>
            <button onClick={() => navigate("/services?search=ai")}>
              AI Services
            </button>
          </div>
        </div>
        <div className="right">
          <img src="/images/hero-person.png" alt="home-hero" />
        </div>
      </main>
    </section>
  );
};

export default Hero;
