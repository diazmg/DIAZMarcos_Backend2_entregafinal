import ProductDAO from './dao/mongo/products.dao.js';

const ProductService = new ProductDAO();

export default (io) => {

    io.on("connection", (socket) => {

        socket.on("createProduct", async (data) => {
            try {
                await ProductService.create(data);

                const products = await ProductService.getAll({});
                socket.emit("publishProducts", products.docs);

            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (data) => {
            try {
                await ProductService.delete(data.pid);

                const products = await ProductService.getAll({});
                socket.emit("publishProducts", products.docs);

            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

    });

};