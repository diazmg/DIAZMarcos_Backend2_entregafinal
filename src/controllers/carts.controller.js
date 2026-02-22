export default class CartsController {

    constructor(service) {
        this.service = service;
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