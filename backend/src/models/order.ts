import { InferSchemaType, model, Schema } from "mongoose";

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: {type: String, required: true},
    currencyType: {type: String, required: true},
    count: {type: Number, required: true},
    countType: {type: String, required: true},
    reason: {type: String, default: ""},
    url: {type: String, default: ""},
    notes: {type: String, default: ""},
}, { timestamps: true });

type Order = InferSchemaType<typeof orderSchema>;

export default model<Order>("Order", orderSchema);