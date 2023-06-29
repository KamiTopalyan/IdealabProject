export interface Order {
    _id: string,
    name: string,
    price: Number,
    currency: "TL" | "USD" | "EURO" | "GPD",
    countType: "piece" | "package", 
    count: Number,
    reason?: String,
    url?: String,
    notes?: String,
    createdAt: string,
    updatedAt: string,
}