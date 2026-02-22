import { Router } from "express";
import { uploader } from "../utils/multerUtil.js";

import ProductDAO from "../dao/mongo/products.dao.js";
import ProductsRepository from "../repositories/products.repository.js";
import ProductsService from "../services/products.service.js";
import ProductsController from "../controllers/products.controller.js";

const router = Router();


const productDAO = new ProductDAO();
const productRepository = new ProductsRepository(productDAO);
const productsService = new ProductsService(productRepository);
const productsController = new ProductsController(productsService);


router.get("/admin/add", productsController.renderAdminForm);
router.get("/", productsController.getAll);
router.get("/:pid", productsController.getById);
router.post("/", uploader.array("thumbnails", 3), productsController.create);
router.put("/:pid", uploader.array("thumbnails", 3), productsController.update);
router.delete("/:pid", productsController.delete);

export default router;