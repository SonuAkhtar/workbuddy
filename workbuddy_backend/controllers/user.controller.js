// Module
import User from "../models/user.model.js";

// Method: Get the user Details
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};
