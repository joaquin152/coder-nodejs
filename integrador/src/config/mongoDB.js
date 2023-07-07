import mongoose from 'mongoose';
import {mongo} from './'

let connection;
(async () => {
    try{
        connection = await mongoose.connect(mongo.mongo_local, {
            useNewUrlParser: true,
            useUnifedTopology :true
        })
        console.log("Conexion exitosa!");
    } catch (error) {
        console.log('No se puede conectar a la DB');
    }
})

export default connection;