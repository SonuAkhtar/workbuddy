// Modules
import showError from "../utils/showError.js";
import Conversation from "../models/conversation.model.js";

// Method: Create a new conversation between user(buyer) and seller(creator)
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: res.isSeller ? req.userID + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    next(error);
  }
};

// Method: Get list of all conversation by user or seller
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });

    res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
};

// Method: Get a single conversation between user(buyer) and seller(creator)
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(showError(404, "Not found"));

    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};

// Method: Update conversation when a new message is sent
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readBySeller: true,
          readByBuyer: true,
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    next(error);
  }
};
