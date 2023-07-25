// Modules
import showError from "../utils/showError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

// Method: create new message with a new conversation ID
export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessages = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(200).send(savedMessages);
  } catch (error) {
    next(error);
  }
};

// Method: get all messages
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
};
