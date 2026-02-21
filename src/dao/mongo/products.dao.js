import productModel from "../models/productModel.js";

export default class ProductDAO {

    async getAll(params) {
        const paginate = {
            page: params?.page ? parseInt(params.page) : 1,
            limit: params?.limit ? parseInt(params.limit) : 10,
        };

        if (params?.sort && (params.sort === "asc" || params.sort === "desc")) {
            paginate.sort = { price: params.sort };
        }

        return await productModel.paginate({}, paginate);
    }

    async getById(pid) {
        const product = await productModel.findById(pid);

        if (!product) {
            throw new Error(`El producto ${pid} no existe`);
        }

        return product;
    }

    async create(data) {
        const { title, description, code, price, stock, category, thumbnails } = data;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Error al crear el producto");
        }

        return await productModel.create({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        });
    }

    async update(pid, data) {
        const result = await productModel.updateOne(
            { _id: pid },
            data
        );

        if (result.matchedCount === 0) {
            throw new Error(`El producto ${pid} no existe`);
        }

        return result;
    }

    async delete(pid) {
        const result = await productModel.deleteOne({ _id: pid });

        if (result.deletedCount === 0) {
            throw new Error(`El producto ${pid} no existe`);
        }

        return result;
    }
}