export default class ProductsService {
    constructor(repository) {
        this.repository = repository;
    }

    createProduct = async (data) => {
        return await this.repository.create(data);
    };
}