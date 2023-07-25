import React from "react";
import "./business.scss";

const Business = () => {
  return (
    <div className="business">
      <h1>
        <span>Creators business</span>A business solution designed for teams
      </h1>

      <main>
        <div className="left">
          <div className="item">
            <p>
              Get amazing businesses experience packed with best tools and
              banefits.
            </p>
            <div className="title">
              <i className="fa-solid fa-handshake"></i>
              Connect to creators with proven business experience.
            </div>
            <div className="title">
              <i className="fa-solid fa-headset"></i>
              Get assistance from experts in the market.
            </div>
            <div className="title">
              <i className="fa-solid fa-arrow-trend-up"></i>
              Expand your business and get tremendous growth.
            </div>
            <button>Explore Business</button>
          </div>
        </div>

        <div className="right">
          <div className="image">
            <img src="/images/home-business.png" alt="business" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Business;
