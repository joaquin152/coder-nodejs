import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
import { products, readProductsData, watchProductsFile } from './productsData.js';

const app = express();
const httpServer = app.listen(8080, ()=>console.log(`Server up in 8080`));

//mover
app.use(express.json())
app.use(express.urlencoded({extended:true}));
//sockets
const socketServer = new Server(httpServer);
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
//routers
watchProductsFile();

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/',viewsRouter);

socketServer.on('connection', socket => {
    socket.emit('productUpdate', products);
});

readProductsData();
