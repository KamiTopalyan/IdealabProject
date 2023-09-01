import OrderModel, { Order } from "../models/order";
import fs from "fs";
import path from "path";
export default function createCVSFile(orders: Order[], fields: string[]) {
    const filePath = path.join(__dirname, "..", "orders.csv");
    const formattedOrders = orders.map((order: Order) => {
        return fields.map((field) => {
            return order[field as keyof Order];
        })
    }).join("\n")
    
    fs.writeFile(filePath, `${fields.join(",")}\n${formattedOrders}`, (err) => {
        if (err) {
            throw err;
        }
    });

    return filePath;
}