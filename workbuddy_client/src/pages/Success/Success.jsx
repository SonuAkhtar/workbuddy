import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createRequest from "../../utils/createRequest";
import "./success.scss";

const Success = () => {
  const navigate = useNavigate();
  const { search } = useLocation;
  const params = new URLSearchParams(search);

  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await createRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="success">
      <span>
        <i className="fa-solid fa-check"></i>
      </span>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
