export default class ProductsController {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const result = await this.service.getAllProducts(req.query);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.pid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    create = async (req, res) => {
        try {
            if (req.files) {
                req.body.thumbnails = req.files.map(file => file.path);
            }
            const result = await this.service.createProduct(req.body);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    update = async (req, res) => {
        try {
            if (req.files) {
                req.body.thumbnails = req.files.map(file => file.path);
            }
            const result = await this.service.updateProduct(req.params.pid, req.body);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const result = await this.service.delete(req.params.pid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    renderAdminForm = async (req, res) => {
        try {
            const products = await this.service.getAllProducts({});
            res.render('adminProducts', {
                title: 'Administrar Productos',
                style: 'index.css',
                products: products.docs || []
            });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };
}