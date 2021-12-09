import mongoose, { Schema, model, Types } from 'mongoose'

export interface Shopping extends mongoose.Document {
    publications: {publication: Types.ObjectId, price: number, quantity: number, image: string, title: string}[];
    price: number;
    amount: number;
    state: boolean;
}

const ShoppingSchema = new Schema({
    publications: [
        {
            publication: {
                type: Types.ObjectId,
                ref: "Publication",
            },
            price: Number,
            quantity: Number,
            image: String,
            title: {
                type: String,
                trim: true
            }
        }
    ],
    amount: {
        type: Number,
        required: [true, "necesita un amount"]
    },
    date: {
        type: String,
        required: [true, "necesita date"]
    },
    state: {
        type: Boolean,
        required: [true, "necesita un state"]
    },
    status:{
        type: String,
        required: [true, "necesita un status"]
    },
    status_detail:{
        type: String,
        required: [true, "necesita un status_detail"]
    }
})

export default model<Shopping>("Shopping", ShoppingSchema)