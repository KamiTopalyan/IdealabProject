export interface Order {
    _id: string,
    user:string,
    name: string,
    price: Number,
    currency: "TL" | "USD" | "EURO" | "GPD",
    countType: "Piece" | "Package", 
    count: Number,
    reason?: String,
    url?: String,
    notes?: String,
    createdAt: string,
    updatedAt: string,
}