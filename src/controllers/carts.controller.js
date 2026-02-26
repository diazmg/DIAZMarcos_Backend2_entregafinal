export default class CartsController {

    constructor(service) {
        this.service = service;
    }

    renderCart = async (req, res) => {
        try {
            const cart = await this.service.getById(req.params.cid);

            const total = cart.products.reduce((acc, item) => {
                return acc + (item.product.price * item.quantity);
            }, 0);

            res.render('cart', {
                title: 'Mi Carrito',
                style: 'index.css',
                cart,
                total
            });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    addProductAndRenderCart = async (req, res) => {
        try {
            await this.service.addProduct(req.params.cid, req.params.pid);
            const cart = await this.service.getById(req.params.cid);

            const total = cart.products.reduce((acc, item) => {
                return acc + item.product.price * item.quantity;
            }, 0);

            res.render("cart", { cart, total, title: "Mi Carrito", style: "index.css" });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    addProduct = async (req, res) => {
        try {
            const pid = req.params.pid;
            const cid = req.user.cart;

            const result = await this.service.addProduct(cid, pid);

            res.send({ status: 'success', payload: result });
        } catch (error) {
            console.error("Error en addProduct Controller:", error);
            res.status(500).send({ status: 'error', message: error.message });
        }
    }

    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.cid);

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
    };

    create = async (req, res) => {
        try {
            const result = await this.service.create();

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
    };

    updateProducts = async (req, res) => {
        try {
            const result = await this.service.updateProducts(
                req.params.cid,
                req.body
            );

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
    };

    clearCart = async (req, res) => {
        try {
            const result = await this.service.clearCart(req.params.cid);

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
    };

    purchase = async (req, res) => {
        try {
            const result = await this.service.purchaseCart(
                req.params.cid,
                req.user.email
            );

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
    };
}