import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import OrderModel from "../models/order";
import UserModel from "../models/user";
import { assertIsDefined } from "../util/assertIsDefined";

export const getOrders: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const orders = await OrderModel.find({ userId: authenticatedUserId }).exec();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrder: RequestHandler = async (req, res, next) => {
    const orderId = req.params.orderId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(orderId)) {
            throw createHttpError(400, "Invalid order id");
        }

        const order = await OrderModel.findById(orderId).exec();


        if (!order) {
            throw createHttpError(404, "order not found");
        }

        if (!order.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this order");
        }

        res.status(200).json(order);
        
    } catch (error) {
        next(error);
    }
};

interface CreateOrderBody {
    name: string,
    price: Number,
    currency: "TL" | "USD" | "EURO" | "GPD",
    countType: "piece" | "package", 
    count: Number,
    reason: String,
    url: String,
    notes: String,
}

export const createOrder: RequestHandler<unknown, unknown, CreateOrderBody, unknown> = async (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const currency = req.body.currency;
    const countType = req.body.countType;
    const count = req.body.count;
    const reason = req.body.reason;
    const url = req.body.url;
    const notes = req.body.notes;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!name) {
            throw createHttpError(400, "Order item must have a name");
        }
        const neworder = OrderModel.create({
            name: name,
            price: price,
            currency: currency,
            countType: countType,
            count: count,
            reason: reason,
            url: url,
            notes: notes,
        }) 

        res.status(201).json(neworder);
    } catch (error) {
        next(error);
    }
};

interface UpdateOrderParams {
    orderId: string,
}

interface UpdateOrderBody {
    name: string,
    price: number,
    currency: "TL" | "USD" | "EURO" | "GPD",
    countType: "piece" | "package", 
    count: number,
    reason: string,
    url: string,
    notes: string,
}

export const updateOrder: RequestHandler<UpdateOrderParams, unknown, UpdateOrderBody, unknown> = async (req, res, next) => {
    const orderId = req.params.orderId;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCurrency = req.body.currency;
    const newCountType = req.body.countType;
    const newCount = req.body.count;
    const newReason = req.body.reason;
    const newUrl = req.body.url;
    const newNotes = req.body.notes;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(orderId)) {
            throw createHttpError(400, "Invalid order id");
        }

        if (!newName) {
            throw createHttpError(400, "Order must have a name");
        }

        if (!newPrice) {
            throw createHttpError(400, "Order must have a price");
        }

        if (!newCurrency) {
            throw createHttpError(400, "Order must have a currency");
        }
        if (!newCountType) {
            throw createHttpError(400, "Order must have a count type");
        }

        if (!newCount) {
            throw createHttpError(400, "Order must have a count");
        }

        const order = await OrderModel.findById(orderId).exec();

        if (!order) {
            throw createHttpError(404, "Order not found");
        }
        if (!order.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this order");
        }

        order.name = newName;
        order.price = newPrice;
        order.currency = newCurrency;
        order.countType = newCountType;
        order.count = newCount;
        order.reason = newReason;
        order.url = newUrl;
        order.notes = newNotes

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
    const orderId = req.params.orderId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(orderId)) {
            throw createHttpError(400, "Invalid order id");
        }

        const order = await OrderModel.findById(orderId).exec();

        if (!order) {
            throw createHttpError(404, "Order not found");
        }

        if (!order.userId.equals(authenticatedUserId) ) {
            throw createHttpError(401, "You cannot access this order");
        }

        await order.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};