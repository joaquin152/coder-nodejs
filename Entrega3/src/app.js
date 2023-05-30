const express = require('express');
const Product = require('./product');
const ProductManager = require('./productManager');
const app = express();
const port = 8080;

let productManager = new ProductManager();

app.use(express.urlencoded({extended:true}));

app.get('/initialize',(req,res)=>{
    productManager.addProduct("Palta", "Palta x1 U", 240, "Sin imagen", "8d93846f-b6bf-4c69-996c-1bccfbddc10c", 100);
    productManager.addProduct("Banana", "Banana x1 K", 495, "Sin imagen", "f8d7d127-2344-40bd-b11a-24bc52f16e49", 100);
    productManager.addProduct("Coca-Cola", "Gaseosa Sabor a Cola x1.75 L", 390, "Sin imagen", "a3ecddb3-f6db-4868-a3f3-7cdd079c78af", 100);
    productManager.addProduct("Leche", "Leche Larga Vida Entera 1 L", 420, "Sin imagen", "7dd311d7-6443-40eb-ad6c-13e6de5b6608", 100);
    productManager.addProduct("Mayonesa ", "Mayonesa Natura 475 g", 325, "Sin imagen", "c53e3cc7-7418-4394-8ee1-222a9dd4e4ae", 100);
    productManager.addProduct("Galletas Surtidas", "Galletas con Sabores Surtidos 389 g", 398, "Sin imagen", "fc1e879e-e714-40eb-89f2-4cd24241bcc1", 100);
    productManager.addProduct("Hamburguesa", "Hamburguesa de Carne Vacuna 320 g", 1035, "Sin imagen", "42e7ce44-adf8-4003-89e1-2ebbace05c77", 100);
    productManager.addProduct("Fernet ", "Aperitivo de Hierbas 750 mL", 2415, "Sin imagen", "91300870-d0a1-4dea-b8f5-54daf0868908", 100);
    productManager.addProduct("Cerveza", "6 X 410 cc", 2715, "Sin imagen", "e4a32f1f-7e5c-410e-bed8-0cb5929900b3", 100);
    productManager.addProduct("Supremas Pollo", "Supremas Pollo Rebozadas 360 g", 1600, "Sin imagen", "40c25910-f0ec-4ce7-a3ca-55a19b165605", 100);
    productManager.addProduct("Agua Mineral sin Gas", "Agua Mineral sin Gas 2 L", 235, "Sin imagen", "26ec4c79-eab3-46ac-af76-59825d14544f", 100);
    console.log(productManager.getProducts());
    res.send({message:"products.json initialized"})
});

app.get('/products',(req,res)=>{
    let {limit} = req.query;
    if (!limit) {
        let products = productManager.getProducts();
        res.send({products});
    } else {
        let intLimit = (+limit);
        if(isNaN(intLimit)) {return res.send({error:"Limit param is not numeric"});}
        let limitedList = productManager.getFirstNProducts(intLimit);
        (!limitedList.length ? res.send({error:"Error while recovering products"}) : res.send({limitedList}) );
    }
    
});

app.get('/products/:productId',(req,res)=>{
    let id = (+req.params.productId);
    if(isNaN(id)) {return res.send({error:"product id is not numeric"});}
    let foundProduct = productManager.getProductById(id);
    (!foundProduct ? res.send({error:"Usuario no encontrado"}) : res.send({foundProduct}));
});

app.listen(port, ()=>console.log(`Server up in ${port}`));