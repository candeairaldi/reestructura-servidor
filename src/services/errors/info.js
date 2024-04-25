export const generateNewProductErrorInfo = (product) => {
    return 'algún dato no es válido.' +
        '\n- título es requerido y se recibió' + product.title +
        '\n- código es requerido y se recibió' + product.code +
        '\n- precio es requerido un número positivo y se recibió' + product.price;
}