import { InferSchemaType, model, Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    user: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: {type: String, required: true},
    count: {type: Number, required: true},
    countType: {type: String, required: true},
    reason: {type: String, default: ""},
    url: {type: String, default: ""},
    notes: {type: String, default: ""},
    status: {type: String, default: "Pending"},
    id: {type: String, required: true, unique: true},
    approved: {type: Boolean, default: false}
}, { timestamps: true });

export type Order = InferSchemaType<typeof orderSchema>;

export default model<Order>("Order", orderSchema);