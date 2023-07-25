// Modules
import showError from "../utils/showError.js";
import Order from "../models/order.model.js";
import Service from "../models/service.model.js";

// Libraries
import Stripe from "stripe";

// Method: Create intent for payment of stripe
export const intent = async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  const stripe = new Stripe(process.env.STRIPE);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: service.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    serviceId: service._id,
    image: service.coverImage,
    title: service.title,
    buyerId: req.userId,
    sellerId: service.userId,
    price: service.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();
  res.status(200).send({ clientSecret: paymentIntent.client_secret });
};

// Method: Confirm the order after payment
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      {
        $set: { isCompleted: true },
      }
    );

    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
};

// Method: Get list of all the order for sellers
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};
