import React from "react";
import "./features.scss";

const Features = () => {
  return (
    <div className="features">
      <main>
        <div className="header">
          <span>The whole</span>
          <h1>Freelance World's</h1>
          <span>talent at your fingertips.</span>
        </div>

        <div className="content">
          <div className="left">
            <div className="item">
              <div className="title">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                The best for every budget.
              </div>
              <p>
                Get high-quality services at every price point. No hourly rate.
              </p>
              <div className="title">
                <i className="fa-solid fa-truck"></i>
                On-time delivery
              </div>
              <p>No need to worry about your project, it will be on time.</p>
              <div className="title">
                <i className="fa-regular fa-comment"></i>
                After work services
              </div>
              <p>
                We don't forget your after project delivery, connect anytime.
              </p>
              <div className="title">
                <i className="fa-solid fa-phone"></i>
                24/7 support
              </div>
              <p>
                Have any issue or feedbach, connect our best support anytime.
              </p>
            </div>
          </div>
          <div className="right">
            <div className="video">
              <video src="/images/homepage-video.mp4" controls loop></video>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
