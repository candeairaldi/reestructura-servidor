async function removeProductFromCart(productId, cartId) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Producto eliminado del carrito');
            window.location.reload();
        }
    } catch (error) {
        alert(error);
    }
}

async function updateProductQuantity(productId, cartId) {
    try {
        const quantity = document.querySelector(`#quantity-${productId}`).value;
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Cantidad actualizada');
            window.location.reload();
        }
    } catch (error) {
        alert(error);
    }
}

async function deleteCart(cartId) {
    try {
        const response = await fetch(`/api/carts/${cartId}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Productos eliminados del carrito');
            window.location.reload();
        }
    } catch (error) {
        alert(error);
    }
}