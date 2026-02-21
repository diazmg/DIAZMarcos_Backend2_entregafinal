import { Router } from "express";
import passport from "passport";

import { authorize } from "../middlewares/authorization.js";

import CartDAO from "../dao/mongo/carts.dao.js";
import ProductDAO from "../dao/mongo/products.dao.js";
import TicketDAO from "../dao/mongo/ticket.dao.js";

import CartRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";
import TicketRepository from "../repositories/tickets.repository.js";

import CartsService from "../services/carts.service.js";
import CartsController from "../controllers/carts.controller.js";

const router = Router();

const cartDAO = new CartDAO();
const productDAO = new ProductDAO();
const ticketDAO = new TicketDAO();

const cartRepository = new CartRepository(cartDAO);
const productRepository = new ProductsRepository(productDAO);
const ticketRepository = new TicketRepository(ticketDAO);

const cartsService = new CartsService(
    cartRepository,
    productRepository,
    ticketRepository
);

const cartsController = new CartsController(cartsService);

router.get("/:cid", cartsController.getById);
router.post("/", cartsController.create);
router.post("/:cid/product/:pid", cartsController.addProduct);
router.delete("/:cid/product/:pid", cartsController.deleteProduct);
router.put("/:cid", cartsController.updateProducts);
router.put("/:cid/product/:pid", cartsController.updateProductQuantity);
router.delete("/:cid", cartsController.clearCart);

router.post(
    "/:cid/purchase",
    passport.authenticate("jwt", { session: false }),
    authorize(["user"]),
    cartsController.purchase
);

export default router;