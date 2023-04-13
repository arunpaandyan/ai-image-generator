import express from "express";
import {
  checkoutPayment,
  updateSubscription,
  buySubscription,
} from "../controllers/paymentController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/create-payment-intent/:id", updateSubscription);

router.post("/create-payment-intent", checkoutPayment);

export default router;
