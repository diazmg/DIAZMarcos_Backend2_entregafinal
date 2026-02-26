showButtonCart();

async function addToCart(pid) {
    try {

        const addProductResponse = await fetch(`/api/carts/products/${pid}`, {
            method: 'POST',
            credentials: 'include'
        });


        if (addProductResponse.status === 401) {
            return alert('Debes iniciar sesión para agregar productos');
        }

        const contentType = addProductResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return alert('Error de conexión con el servidor');
        }

        const addProduct = await addProductResponse.json();

        if (addProduct.status === 'error') {
            return alert(addProduct.message);
        }

        showButtonCart();
        alert('Producto añadido satisfactoriamente!');

    } catch (error) {
        console.error("Error en addToCart:", error);
        alert('Hubo un error al intentar agregar el producto');
    }
}

async function showButtonCart() {
    try {
        const response = await fetch('/api/sessions/current', {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();

            const cartId = data.user.cart;

            if (cartId) {
                const cartLink = document.querySelector('#button-cart');
                const cartContainer = document.querySelector('.view-cart');

                if (cartLink) cartLink.setAttribute("href", `/cart/${cartId}`);
                if (cartContainer) cartContainer.style.display = "block";
            }
        } else {
            const cartContainer = document.querySelector('.view-cart');
            if (cartContainer) cartContainer.style.display = "none";
        }
    } catch (error) {
        console.log("Usuario no logueado o error de sesión");
    }
}