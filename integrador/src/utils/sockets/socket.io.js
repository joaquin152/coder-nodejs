import {socketIO} from 'socket.io';

class Socket {
    constructor(server) {
        this.io = socketIO(server);
        if (Socket.instancia) {
            return Socket.instancia;
        }
        Socket.instancia = this;
        this.io = new socketIO(Http);
    }

    init(){
        try {
            this.io.on("connection", socket => {
                console.log("nuevo")
            })
        } catch (error) {
            console.log ("Error")
        }

    }
}

export default Socket;