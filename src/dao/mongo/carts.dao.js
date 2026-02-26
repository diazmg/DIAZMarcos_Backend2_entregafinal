import { cartModel } from "../models/cartModel.js";

export default class CartDAO {

    async getById(cid) {
        const cart = await cartModel
            .findById(cid)
            .populate("products.product")
            .lean();

        if (!cart) {
            throw new Error(`El carrito ${cid} no existe`);
        }

        return cart;
    }

    async create() {
        return await cartModel.create({ products: [] });
    }

    async updateProducts(cid, products) {
        const result = await cartModel.updateOne(
            { _id: cid },
            { products: products }
        );

        if (result.matchedCount === 0) {
            throw new Error(`El carrito ${cid} no existe`);
        }

        return await this.getById(cid);
    }

    async clear(cid) {
        const result = await cartModel.updateOne(
            { _id: cid },
            { products: [] }
        );

        if (result.matchedCount === 0) {
            throw new Error(`El carrito ${cid} no existe`);
        }

        return await this.getById(cid);
    }
}