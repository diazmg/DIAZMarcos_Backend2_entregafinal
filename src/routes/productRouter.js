import { Router } from "express";
import { uploader } from "../utils/multerUtil.js";

import ProductDAO from "../dao/mongo/products.dao.js";
import ProductsRepository from "../repositories/products.repository.js";

const router = Router();

const productDAO = new ProductDAO();
const productRepository = new ProductsRepository(productDAO);

router.get("/", async (req, res) => {
    try {
        const result = await productRepository.getAll(req.query);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const result = await productRepository.getById(req.params.pid);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
});

router.post("/", uploader.array("thumbnails", 3), async (req, res) => {
    if (req.files) {
        req.body.thumbnails = req.files.map(file => file.path);
    }

    try {
        const result = await productRepository.create(req.body);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
});

router.put("/:pid", uploader.array("thumbnails", 3), async (req, res) => {
    if (req.files) {
        req.body.thumbnails = req.files.map(file => file.path);
    }

    try {
        const result = await productRepository.update(req.params.pid, req.body);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const result = await productRepository.delete(req.params.pid);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
});

export default router;