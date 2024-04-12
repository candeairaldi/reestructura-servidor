async function logout() {
    try {
        const response = await fetch('/api/sessions/logout', { method: 'POST' });
        const data = await response.json();
        alert(data.message);
        if (data.status === 'success') {
            window.location.href = '/login';
        }
    } catch (error) {
        alert(error);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.status === 'error') {
            alert(data.message);
        } else {
            alert('Producto elimidado exitosamente');
            window.location.reload();
        }
    } catch (error) {
        alert(error);
    }
}