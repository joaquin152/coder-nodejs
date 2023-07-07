import { Schema, model } from "mongoose";

const collectionName = "user";

const collectionSchema = new Schema({
    nombre: String,
    apellido: String,
    email: {
        unique: true,
        type: String,
        required: true
    },
    edad: {
        type: Date,
    },
    isActive: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    photo: String,
})

const modelEntity = model( collectionName, collectionSchema);

export default modelEntity;