import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import connectMongoDB from './config/db.js';
import dotenv from "dotenv";

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";

//Inicialización de variables de entorno
dotenv.config();

const app = express();

connectMongoDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Handlebars Config
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Passport
initializePassport();
app.use(passport.initialize());

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use("/api/sessions", sessionsRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);