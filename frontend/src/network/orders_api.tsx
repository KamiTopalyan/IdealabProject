import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Order } from "../models/order";
import { User } from "../models/user";
import axios from "axios"

const url = process.env.NODE_ENV === 'production' ? 'http://178.244.224.244:3001' : 'http://localhost:3001';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function download() {
    const response = await fetchData("/api/orders/download", { method: "GET" });
    return response.status;
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}


export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await axios.post("/api/users/login", {username: credentials.username, password: credentials.password});
    localStorage.setItem("auth", response.data)
    return response.data;
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchOrders(): Promise<Order[]> {
    const response = await fetchData("/api/orders", { method: "GET" });
    return response.json();
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
    const response = await fetchData("/api/orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    return response.json();
}

export async function updateOrder(orderId: string, order: OrderInput): Promise<Order> {
    const response = await fetchData("/api/orders/" + orderId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    return response.json();
}

export async function approveOrder(orderId: string): Promise<Order> {
    const response = await fetchData("/api/orders/approveOrder/" + orderId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        });
    return response.json();
}

export async function rejectOrder(orderId: string): Promise<Order> {
    const response = await fetchData("/api/orders/rejectOrder/" + orderId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        });
    return response.json();
}

export async function deleteOrder(orderId: string) {
    await fetchData("/api/orders/" + orderId, { method: "DELETE" });
}

