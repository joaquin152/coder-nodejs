import dotenv from 'dotenv';

dotenv.config()

const config = {
    port: process.env.PORT
}

const mongo = {
    mongo_local: process.env.MONGO_LOCAL
}

export {config, mongo};