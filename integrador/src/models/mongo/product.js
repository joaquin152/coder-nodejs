import { Schema, model } from "mongoose";

const collectionName = "product";

const collectionSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    imagen: String,
})

const modelEntity = model( collectionName, collectionSchema);

export default modelEntity;