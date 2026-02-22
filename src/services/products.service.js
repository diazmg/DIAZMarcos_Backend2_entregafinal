export default class ProductsService {
    constructor(repository) {
        this.repository = repository;
    }

    getAllProducts = async (params) => {
        return await this.repository.getAll(params);
    };

    getById = async (id) => {
        return await this.repository.getById(id);
    };

    createProduct = async (data) => {
        return await this.repository.create(data);
    };

    updateProduct = async (id, data) => {
        return await this.repository.update(id, data);
    };

    deleteProduct = async (id) => {
        return await this.repository.delete(id);
    };
}