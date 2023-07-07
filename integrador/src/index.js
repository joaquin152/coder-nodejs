import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
//import handlebars from 'express-handlebars';
//import {Server} from 'socket.io';
import serverRouter from './routes';
import {config} from './config';
import Socket from './utils/sockets/socket.io.js';

class Server {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.settings();
        this.views();
        this.middleware();
        this.socket = new Socket(this.server);
        this.route();
        //this.listen();
    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static(__dirname+'/public'));
    }

    views() {
        this.app.set("views", path.join(__dirname, "views"))
        this.app.set("view engine", "ejs");
    }

    middleware() {
        this.app.use(cors("*"));

    }

    route() {
        this.app.use((req, res, next) => {
            req["socketManager"] = this.socket;
            next();
        });
        serverRouter(this.app, this.socket);
    }
    listen() {
        this.app.listen(8080, ()=>console.log(`Server up in 8080`));
    }

}
const server = new Server();

export {server};
