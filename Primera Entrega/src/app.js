const express = require('express');

const products = require('./routes/products.router.js');
const carts = require('./routes/carts.router.js');

const app = express();
const server = app.listen(8080, ()=>console.log(`Server up in 8080`));

//app.use(express.static('/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/products', products.router);
app.use('/api/carts', carts);

