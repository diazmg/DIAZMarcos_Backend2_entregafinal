import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import dotenv from "dotenv";
import passport from "passport";

import connectMongoDB from './config/db.js'
import initializePassport from "./config/passport.config.js";
import path from "path";
import { fileURLToPath } from "url";
import websocket from './websocket.js';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import sessionsRouter from "./routes/sessions.router.js";

//Inicialización de variables de entorno
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirnameReal = path.dirname(__filename);

connectMongoDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirnameReal, "../public")));

app.use(cookieParser());

//Handlebars Config
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        multiply: (a, b) => a * b
    }
}));
app.set("views", path.join(__dirnameReal, "views"));
app.set('view engine', 'handlebars');

//Passport
initializePassport();
app.use(passport.initialize());

//Routers
app.use("/api/sessions", sessionsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);