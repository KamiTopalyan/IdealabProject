import express from "express";
import * as orderController from "../controllers/orders";

const router = express.Router();

router.get("/", orderController.getOrders);

router.get("/:orderId", orderController.getOrder);

router.post("/", orderController.createOrder);

router.post("/download", orderController.downloadOrders);

router.patch("/:orderId", orderController.updateOrder);

router.patch("/approveOrder/:orderId", orderController.approveOrder);

router.patch("/rejectOrder/:orderId", orderController.rejectOrder);

router.delete("/:orderId", orderController.deleteOrder);

export default router;