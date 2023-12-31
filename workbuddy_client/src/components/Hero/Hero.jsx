import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.scss";

const Hero = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSeaerch = () => {
    let searchVal = "";

    if (input.includes("mobile")) searchVal = "mobile";
    else if (input.includes("web")) searchVal = "web";
    else if (input.includes("ui")) searchVal = "uiux";
    else if (input.includes("ai")) searchVal = "ai";
    else if (input.includes("animation")) searchVal = "animation";
    else if (input.includes("graphic")) searchVal = "graphic";
    else if (input.includes("music")) searchVal = "music";
    else if (input.includes("cloud")) searchVal = "cloud";

    navigate(`/services?category=${searchVal}`);
  };

  return (
    <section className="hero">
      <main>
        <div className="left">
          <div className="heroTitle">
            <h1>
              Get the best
              <span>Freelancers</span>
              for your business.
            </h1>
          </div>
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
            <button onClick={() => navigate("/services?category=uiux")}>
              UI/UX Design
            </button>
            <button onClick={() => navigate("/services?category=web")}>
              Web Development
            </button>
            <button onClick={() => navigate("/services?category=ai")}>
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
