import express from "express";
import * as orderController from "../controllers/orders";

const router = express.Router();

router.get("/", orderController.getOrders);

router.get("/download", orderController.downloadOrders);

router.get("/:orderId", orderController.getOrder);

router.post("/", orderController.createOrder);

router.patch("/:orderId", orderController.updateOrder);

router.patch("/approveOrder/:orderId", orderController.approveOrder);

router.patch("/rejectOrder/:orderId", orderController.rejectOrder);

router.delete("/:orderId", orderController.deleteOrder);

export default router;