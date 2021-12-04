import mongoose, { Schema, model } from "mongoose";

export interface Publication extends mongoose.Document {
    name: string;
    images: {public_id: string, url: string}[];
    stock: number;
    mark: string;
    detail: string;
    price: number;
    category: string;
    author: Schema.Types.ObjectId;
    gender: string;
    order: string;
}


const PublicationSchema = new Schema({
    name: {
        type: String,
        required: [true, "falta product name"]
    },
    images: {
        type: [{
            public_id: String,
            url: String,
            _id: false 
        }],
        required: true
    },
    stock: {
        type: Number,
        required: [true, "falta stock"]
    },
    mark: {
        type: String,
        required: [true, "necesita una marca"]
    },
    detail: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "necesita precio"]
    },
    category: {
        type: String,
        required: [true, "se require categoria valida"],
        enum: ["Remera", "Patanlon", "Zapatillas", "Zapatos"]
    },
    author: {
        type: Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    gender: {
        type: String,
        required: [true, "necesita un gender"],
        enum: ["Hombre", "Mujer", "Niños"]
    },
    order: {
        type: String,
    }
})

export default model<Publication>("Publication", PublicationSchema);