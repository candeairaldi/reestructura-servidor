export default class ProductDTO {
    constructor(product) {
        this.title = product.title.trim();
        this.description = product.description?.trim() || 'Sin descripción';
        this.code = product.code.trim();
        this.price = product.price;
        // product.status es un booleano, se asigna tal cual. Si es un string, se asigna true si es 'true' y false en otro
        this.status = typeof product.status === 'boolean' ? product.status : product.status === 'true' ? true : false;
        // product.stock es un número, se asigna tal cual. Si no es un número o es menor a 0, se asigna 0.
        this.stock = product.stock ? (isNaN(product.stock) || product.stock < 0 ? 1 : parseInt(product.stock)) : 0;
        this.category = product.category?.trim() || 'Otros';
        // product.thumbnails es un array, se asigna tal cual. Si es un string, se separa por comas y se eliminan los espacios
        this.thumbnails = Array.isArray(product.thumbnails) ? product.thumbnails : (product.thumbnails ? product.thumbnails.split(',').map(thumbnail => thumbnail.trim()) : []);
        this.owner = product.owner?.trim() || 'admin';
    }
}