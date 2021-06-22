//? Service faz o tratamentoo da regra de negocio
import ProductRepository from "../repositories/product.repository.js";

async function createProduct(product) {
    //* cria e retorna o objeto
    return await ProductRepository.insertProduct(product);
}

async function getProducts() {
    return await ProductRepository.getProducts();
}

async function getProduct(id) {
    return await ProductRepository.getProduct(id);
}

async function deleteProduct(id) {
    //* nao coloca return pois nao esta esperando nenhum retorno
    await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
    return await ProductRepository.updateProduct(product);
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}