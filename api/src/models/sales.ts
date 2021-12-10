import mongoose, { Schema, model, Types } from 'mongoose'

export interface Sales extends mongoose.Document {
    publications: {publication: Types.ObjectId, price: number, quantity: number, image: string, title: string}[];
    price: number;
    amount: number;
    state: boolean;
    userId: Schema.Types.ObjectId;

}

const SalesSchema = new Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
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

export default model<Sales>("Sales", SalesSchema)