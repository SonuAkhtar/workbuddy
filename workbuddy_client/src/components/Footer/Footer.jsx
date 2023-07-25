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
            <span>Digital Marketing</span>
            <span>Video & Animation</span>
            <span>Business</span>
            <span>LifeStyle</span>
            <span>Photography</span>
          </div>
          <div className="item">
            <h2>Categories</h2>
            <span>Digital Marketing</span>
            <span>Video & Animation</span>
            <span>Business</span>
            <span>LifeStyle</span>
            <span>Photography</span>
          </div>
          <div className="item">
            <h2>Categories</h2>
            <span>Digital Marketing</span>
            <span>Video & Animation</span>
            <span>Business</span>
            <span>LifeStyle</span>
            <span>Photography</span>
          </div>
          <div className="item">
            <h2>Categories</h2>
            <span>Digital Marketing</span>
            <span>Video & Animation</span>
            <span>Business</span>
            <span>LifeStyle</span>
            <span>Photography</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Fiverr</h2>
            <span>Fiverr international Ltd. 2023</span>
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
