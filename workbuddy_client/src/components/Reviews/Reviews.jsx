import React from "react";
import Review from "../Review/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import "./reviews.scss";

const Reviews = ({ serviceId }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      createRequest.get(`/reviews/${serviceId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return createRequest.post("/reviews", review);
    },

    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  const handleReview = (e) => {
    e.preventDefault();

    let desc = e.target[0].value;
    let star = e.target[1].value;

    mutation.mutate({ serviceId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading"
        : error
        ? "Something went wrong"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <hr />

      <div className="add">
        <form onSubmit={handleReview}>
          <div className="content">
            <div className="reviewComment">
              <label>Add a Review</label>
              <input type="text" placeholder="Write your review" />
            </div>

            <div className="reviewRating">
              <label>Rating</label>
              <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
