export default class ProductsController {
    constructor(service) {
        this.service = service;
    }

    create = async (req, res) => {
        const result = await this.service.createProduct(req.body);
        res.send({ status: "success", payload: result });
    };
}