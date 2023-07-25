import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import moment from "moment";
import "./messages.scss";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      createRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return createRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleMsgRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <section className="messages">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <main>
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((conv) => (
                <tr
                  key={conv.id}
                  className={
                    (currentUser.isSeller && !conv.readBySeller) ||
                    (!currentUser.isSeller && !conv.readByBuyer)
                      ? "active"
                      : ""
                  }
                >
                  <td>{currentUser.isSeller ? conv.buyerId : conv.sellerId}</td>
                  <td>
                    <Link to={`/message/${conv.id}`} className="link">
                      {conv?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(conv.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !conv.readBySeller) ||
                      (!currentUser.isSeller && !conv.readByBuyer)) && (
                      <button onClick={() => handleMsgRead(conv.id)}>
                        Mark as read
                      </button>
                    )}
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

export default Messages;
