// Modules
import Service from "../models/service.model.js";
import Review from "../models/review.model.js";
import showError from "../utils/showError.js";

// Method: Create a review by the buyer
export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(showError(403, "Sellers can't create a review"));

  const newReview = new Review({
    userId: req.userId,
    serviceId: req.body.serviceId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      serviceId: req.body.serviceId,
      userId: req.userId,
    });

    if (review)
      return next(showError(403, "You have already created a review"));

    const savedReview = await newReview.save();
    await Service.findByIdAndUpdate(req.body.serviceId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (error) {
    next(error);
  }
};

// Method: Get all the reviews
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId });

    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

// Method: Delete a review by buyer
export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
