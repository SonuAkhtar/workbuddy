import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Libraries
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import createRequest from "../../utils/createRequest";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./pay.scss";

const stripePromise = loadStripe(
  "pk_test_51NVqsMSB5mcksFhNHttQ30BS3Taw8f2OMAydvWOy4zs3M4uiVwOgs1hcrLSflPH71Uzfy417yRdgHDzoFBWQwlSW00LX8EXg6w"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await createRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      <main>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </main>
    </div>
  );
};

export default Pay;
