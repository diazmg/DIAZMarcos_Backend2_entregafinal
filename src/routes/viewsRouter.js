import { Router } from 'express';
import ProductDAO from '../dao/mongo/products.dao.js';
import CartDAO from '../dao/mongo/carts.dao.js';

const router = Router();

const ProductService = new ProductDAO();
const CartService = new CartDAO(ProductService);

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        style: 'index.css'
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        style: 'index.css'
    });
});

router.get("/current", (req, res) => {
    res.render("current", {
        title: "Perfil",
        style: "index.css"
    });
});


router.get("/", (req, res) => {
    res.redirect("/products");
});


router.get('/products', async (req, res) => {
    const products = await ProductService.getAll(req.query);

    res.render('index', {
        title: 'Productos',
        style: 'index.css',
        products: JSON.parse(JSON.stringify(products.docs)),
        prevLink: {
            exist: products.prevLink ? true : false,
            link: products.prevLink
        },
        nextLink: {
            exist: products.nextLink ? true : false,
            link: products.nextLink
        }
    });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductService.getAll(req.query);

    res.render('realTimeProducts', {
        title: 'Productos',
        style: 'index.css',
        products: JSON.parse(JSON.stringify(products.docs))
    });
});

router.get("/cart/:cid", async (req, res) => {
    try {
        const response = await CartService.getById(req.params.cid);

        res.render("cart", {
            title: "Carrito",
            style: "index.css",
            cart: response,
            total: response.products.reduce(
                (acc, p) => acc + (p.product?.price || 0) * p.quantity,
                0
            ),
        });
    } catch (error) {
        return res.render("notFound", {
            title: "Not Found",
            style: "index.css",
        });
    }
});

router.get("/forgot-password", (req, res) => {
    res.render("forgot-password", {
        title: "Recuperar contraseña",
        style: "index.css"
    });
});

export default router;