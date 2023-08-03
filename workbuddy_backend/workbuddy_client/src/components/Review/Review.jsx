import React from "react";
import { useQuery } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import "./review.scss";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${review.userId}`],
    queryFn: () =>
      createRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="user">
          <img
            src={data.image || "/images/noavatar.jpg"}
            alt="user"
            className="profile"
          />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <img src="/images/star.png" alt="star" />
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((img, i) => (
            <img key={i} src="/images/star.png" alt="star" />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/images/like.png" alt="like" />
        <span>Yes</span>
        <img src="/images/dislike.png" alt="dislike" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
