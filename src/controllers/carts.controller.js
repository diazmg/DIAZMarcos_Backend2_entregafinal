export default class CartsController {
    constructor(service) {
        this.service = service;
    }

    purchase = async (req, res) => {
        try {
            const result = await this.service.purchaseCart(
                req.params.cid,
                req.user.email
            );

            res.send({ status: "success", payload: result });

        } catch (error) {
            res.status(400).send({
                status: "error",
                message: error.message
            });
        }
    };
}