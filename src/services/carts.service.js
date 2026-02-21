import crypto from "crypto";

export default class CartsService {
    constructor(cartRepository, productRepository, ticketRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.ticketRepository = ticketRepository;
    }

    purchaseCart = async (cid, purchaserEmail) => {

        const cart = await this.cartRepository.getById(cid);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        let totalAmount = 0;
        const productsNotProcessed = [];

        for (const item of cart.products) {

            const product = await this.productRepository.getById(item.product._id);

            if (product.stock >= item.quantity) {

                const newStock = product.stock - item.quantity;

                await this.productRepository.update(product._id, {
                    stock: newStock
                });

                totalAmount += product.price * item.quantity;

            } else {
                productsNotProcessed.push(item);
            }
        }

        if (totalAmount === 0) {
            throw new Error("No hay productos con stock disponible");
        }

        const ticket = await this.ticketRepository.create({
            code: crypto.randomBytes(10).toString("hex"),
            amount: totalAmount,
            purchaser: purchaserEmail
        });

        await this.cartRepository.updateProducts(cid, productsNotProcessed);

        return {
            ticket,
            productsNotProcessed
        };
    };
}