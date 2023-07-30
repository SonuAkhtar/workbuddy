import React from "react";
import { useQuery } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import { useNavigate } from "react-router-dom";
import "./orders.scss";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      createRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;

    const convId = sellerId + buyerId;

    try {
      const res = await createRequest.get(`/conversations/single/${convId}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await createRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <section className="orders">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <main>
          <h1>Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>

            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="img" src={order.image} alt="img" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <i
                      className="fa-regular fa-message"
                      onClick={() => handleContact(order)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </section>
  );
};

export default Orders;
