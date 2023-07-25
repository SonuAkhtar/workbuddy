import React from "react";
import "./trustedBy.scss";

const TrustedBy = () => {
  return (
    <div className="trustedBy">
      <main>
        <div className="left">
          <span>Trusted By:</span>
        </div>
        <div className="right">
          <div className="item">
            <i className="fa-brands fa-amazon"></i>
            <span className="text">mazon</span>
          </div>
          <div className="item">
            <i className="fa-brands fa-behance"></i>
            <span className="text">hance</span>
          </div>
          <div className="item">
            <i className="fa-brands fa-google"></i>

            <span className="text">oogle</span>
          </div>
          <div className="item">
            <i className="fa-brands fa-shopify"></i>
            <span className="text">hopify</span>
          </div>
          <div className="item">
            <i className="fa-brands fa-paypal"></i>
            <span className="text">aypal</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrustedBy;
