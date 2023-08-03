import React from "react";
import { useLocation } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <div className="footer">
      <main>
        <div
          className={`top ${
            pathname === "/login" || pathname === "/register" ? "hide" : ""
          }`}
        >
          <div className="item">
            <h2>Categories</h2>
            <span>UI/UX Design</span>
            <span>Animation</span>
            <span>Developement</span>
            <span>Photography</span>
          </div>
          <div className="item">
            <h2>Services</h2>
            <span>Hosting</span>
            <span>Cloud</span>
            <span>Domain</span>
            <span>Advertisement</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Company</span>
            <span>Team</span>
            <span>Founders</span>
            <span>Careers</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h1>
              Work<span>Buddy</span>
            </h1>
            <span>workbuddy international Ltd. 2023 &copy;</span>
          </div>
          <div className="right">
            <div className="social">
              <i className="fa-brands fa-square-facebook"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-square-twitter"></i>
              <i className="fa-brands fa-square-instagram"></i>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Footer;
