showButtonCart();

async function addToCart(pid) {
    try {

        const addProductResponse = await fetch(`/api/carts/products/${pid}`, {
            method: 'POST',
            credentials: 'include'
        });


        if (addProductResponse.status === 401) {
        }

        const contentType = addProductResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
        }

        const addProduct = await addProductResponse.json();

        if (addProduct.status === 'error') {
        }

        showButtonCart();

    } catch (error) {
        console.error("Error en addToCart:", error);
    }
}

async function showButtonCart() {
    const cartLink = document.querySelector("#button-cart");
    const cartContainer = document.querySelector(".view-cart");

    if (!cartLink || !cartContainer) return;

    try {
        const response = await fetch("/api/sessions/current", { credentials: "include" });

        if (!response.ok) {
            cartContainer.style.display = "none";
            cartLink.setAttribute("href", "#");
            return;
        }

        const data = await response.json();
        const cartId = data?.user?.cart;

        if (!cartId || typeof cartId !== "string") {
            cartContainer.style.display = "none";
            cartLink.setAttribute("href", "#");
            return;
        }

        cartLink.setAttribute("href", `/cart/${cartId}`);
        cartContainer.style.display = "block";
    } catch (e) {
        cartContainer.style.display = "block";
        if (cartLink) cartLink.setAttribute("href", "#");
    }
}