import express from "express";
import * as orderController from "../controllers/orders";

const router = express.Router();

router.get("/", orderController.getOrder);

router.get("/:orderId", orderController.getOrders);

router.post("/", orderController.createOrder);

router.patch("/:orderId", orderController.updateOrder);

router.delete("/:orderId", orderController.deleteOrder);

export default router;