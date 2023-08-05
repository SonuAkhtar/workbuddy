import React from "react";
import { Link } from "react-router-dom";
import createRequest from "../../utils/createRequest";
import { useQuery } from "@tanstack/react-query";
import "./serviceCard.scss";

const ServiceCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      createRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/services/single/${item._id}`} className="link">
      <div className="serviceCard">
        <img src={item.coverImage} alt="Coverimage" />
        <div className="info">
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="user">
              <img src={data.image || "images/noavatar.jpg"} alt="profile" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            {Array(Math.round(item.totalStars / item.starNumber))
              .fill()
              .map((img, i) => (
                <img key={i} src="/images/star.png" alt="star" />
              ))}
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./images/heart.png" alt="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
