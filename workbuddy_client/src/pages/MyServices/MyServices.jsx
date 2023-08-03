import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import "./myServices.scss";

const MyServices = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myServices"],
    queryFn: () =>
      createRequest.get(`/services?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return createRequest.delete(`/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myServices"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <section className="myServices">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <main>
          <div className="title">
            <h1>My Services</h1>
            <Link to="/serviceAdd">
              <button>Add New Service</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((service) => (
                <tr key={service._id}>
                  <td>
                    <img className="img" src={service.cover} alt="img" />
                  </td>
                  <td>{service.title}</td>
                  <td>{service.price}</td>
                  <td>{service.sales}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handleDelete(service._id)}
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

export default MyServices;
