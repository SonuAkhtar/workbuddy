// Modules
import Service from "../models/service.model.js";
import showError from "../utils/showError.js";

// Method: get all services
export const getAllServices = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const services = await Service.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(services);
  } catch (error) {
    next(error);
  }
};

// Method: get single service
export const getSingleService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) next(showError(404, "Service not found"));

    res.status(200).send(service);
  } catch (error) {
    next(error);
  }
};

// Method: for Sellers to create a new service
export const createService = async (req, res, next) => {
  if (!req.isSeller)
    return next(showError(403, "Only sellers can create a service!"));

  const newService = new Service({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    next(err);
  }
};

// Method: for Sellers to delete existing service
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service.userId !== req.userId)
      return next(showError(403, "you can only delete your service"));

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).send("Service has been deleted");
  } catch (error) {
    next(error);
  }
};
