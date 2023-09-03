import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Order } from "../models/order";
import { refresh, logout } from "./users_api";
import axios from "axios"

const url = process.env.NODE_ENV === 'production' ? 'http://178.244.224.244:3001' : 'http://localhost:3001';

async function fetchData(endpoint: RequestInfo, method: "post" | "get" | "patch" | "delete", data?: Object) {   
    
    const currentTime = new Date(Date.now()).toISOString();
    const accessTokenExp = localStorage.getItem("accessTokenExp");
    const refreshTokenExp = localStorage.getItem("refreshTokenExp");

    if (refreshTokenExp && refreshTokenExp < currentTime) {
        console.log(await logout());
        return {
        status: 403,
        data: {
            error: "Your session has expired. Please login again.",
        },
        };
    }

    if (accessTokenExp && accessTokenExp < currentTime) {
        await refresh();
    }

    const response = await axios({
      method: method,
      url: url + endpoint,
      data: data,
    });
    

    if (response.status === 200 || response.status === 201 || response.status === 204) {
        return response;
    } else {    
        const errorMessage = response.data;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export interface OrderDownloadInput {
  count: Boolean;
  currency: Boolean;
  dates: Boolean;
  url: Boolean;
  name: Boolean;
  notes: Boolean;
  price: Boolean;
  reason: Boolean;
  status: Boolean;
  user: Boolean;
}

export async function fetchOrders(): Promise<any> {
    const response = await fetchData("/api/orders", "get");
    return response;
}

export interface OrderInput {
    name: string,
    price: Number,
    currency: "TL" | "USD" | "EURO" | "GPD",
    countType: "piece" | "package", 
    count: Number,
    reason?: String,
    url?: String,
    notes?: String,
}

export async function createOrder(order: OrderInput): Promise<Order> {
    const response = await fetchData("/api/orders", "post", order);
    return response.data;
}
export interface OrderDownloadFields {
  name: Boolean;
  price: Boolean;
  currency: Boolean;
  countType: Boolean;
  count: Boolean;
  reason: Boolean;
  url: Boolean;
  notes: Boolean;
  dates: Boolean;
}

export async function download(fields: OrderDownloadFields): Promise<any> {
    const selectedFields = Object.entries(fields).map(([key, value]) => {
    if (value === true) {
        return key;
    }
    return null;
    });
  if (selectedFields.length === 0) {
    throw new Error("At least one field must be selected");
  }
  if(selectedFields.includes("count")) {
    selectedFields.splice(selectedFields.indexOf("count")+1, 0,"countType");
  }

  const response = await fetchData("/api/orders/download", "post", {fields: selectedFields.filter((it) => !!it)});
  return response;
}

export async function updateOrder(orderId: string, order: OrderInput): Promise<Order> {
    const response = await fetchData("/api/orders/" + orderId, "patch", order);
    return response.data;
}

export async function approveOrder(orderId: string): Promise<Order> {
    const response = await fetchData("/api/orders/approveOrder/" + orderId, "patch")
    return response.data;
}

export async function rejectOrder(orderId: string): Promise<Order> {
    const response = await fetchData("/api/orders/rejectOrder/" + orderId, "patch");
    return response.data;
}

export async function deleteOrder(orderId: string) {
    await fetchData("/api/orders/" + orderId, "delete");
}


