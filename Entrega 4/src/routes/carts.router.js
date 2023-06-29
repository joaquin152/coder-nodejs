import CartManager from '../models/cartManager.js';
import {getProductManager} from './products.router.js';
import CartStuff  from '../models/cartStuff.js';
import Cart from '../models/cart.js';
import {Router} from 'express';

let cartManager = new CartManager();

const router = Router();
const productManager = getProductManager();

router.get('/:cartId',(req,res)=>{
    let id = (+req.params.cartId);
    if(isNaN(id)) {return res.send({error:"Cart id is not numeric"});}
    let foundCart = cartManager.getCartById(id);
    (!foundCart ? res.status(400).send({status:"error", message:"carto no encontrado"}) : res.status(200).send({foundCart}));
});

router.post('/', (req,res) => {
    let cart = req.body;
    if (!cart.products) {
        console.log("Incomplete fields");
        return res.status(400).send({status:"error", message:"Incomplete fields"});
    }
    
    try {
        const products = req.body.products.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));
        products.forEach(product => {
            let productFound = productManager.getProductById(product.product);
            if (!productFound) return res.status(400).send({status:"error", message:`Producto no encontrado con id ${product.product}`});
        });
        cartManager.addNewCart(products);
    } catch (err) {
        return res.status(400).send({status:"error", message:"Products must be an array with product and quantity"});
    }
    res.status(200).send({status:"success", message:"New cart added"});
});

router.post('/:cid/product/:pid', (req,res) => {
    let cardId = (+req.params.cid);
    let productId = (+req.params.pid);
    let cartReq = req.body;
    if (!cartReq.product || !cartReq.quantity) {
        console.log("Incomplete fields");
        return res.status(400).send({status:"error", message:"Incomplete fields"});
    }
    
    try {
        let cartFound = cartManager.getCartById(cardId);
        let cart = new Cart (cartFound.id, cartFound.cartStuff);
        let cartstuffFound = cart.getCartStuffById(productId);
        let cartstuff = new CartStuff(cartstuffFound.product, cartstuffFound.quantity);
        Object.assign(cartstuffFound,cartstuff.update(cartReq.product, cartReq.quantity));
        cartManager.saveCartsToFile();
    } catch (err) {
        console.log(err);
        return res.status(400).send({status:"error", message:"Error"});
    }
    res.status(200).send({status:"success", message:"Card mofied"});
});

export default router;