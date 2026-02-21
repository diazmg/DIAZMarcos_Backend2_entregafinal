export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getById = async (cid) => {
        return await this.dao.getById(cid);
    };

    create = async () => {
        return await this.dao.create();
    };

    updateProducts = async (cid, products) => {
        return await this.dao.updateProducts(cid, products);
    };

    clear = async (cid) => {
        return await this.dao.clear(cid);
    }
}