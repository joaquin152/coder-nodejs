import chatAPI from "../components/chat";
import productAPI from "../components/product";

const app = (app, socket) => {
    chatAPI(app);
    productAPI(app);
    app.get("/", (req, res, next)=> {res.send("Server on!")});
}

export default app;