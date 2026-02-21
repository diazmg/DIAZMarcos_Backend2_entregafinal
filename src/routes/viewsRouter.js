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

router.get('/cart/:cid', async (req, res) => {
    const response = await CartService.getById(req.params.cid);

    if (response.status === 'error') {
        return res.render('notFound', {
            title: 'Not Found',
            style: 'index.css'
        });
    }

    res.render('cart', {
        title: 'Carrito',
        style: 'index.css',
        products: JSON.parse(JSON.stringify(response.products))
    });
});

export default router;