import {Router} from "express";
import productController from './controller/productController.js';


const app = (app) => {
    const router = Router();
    app.use('/product', router)
    router.get('/', productController.get)
    router.get('/:id', productController.get)
    router.post('/', productController.get)
    
}

export default app;