//? Service faz o tratamentoo da regra de negocio / validacoes
import ProductRepository from "../repositories/product.repository.js";
import SupplierReposytory from "../repositories/supplier.repository.js";

async function createProduct(product) {
    const errors = [];

    if(await SupplierReposytory.getSupplier(product.supplier_id)) {
        //* cria e retorna o objeto
        return await ProductRepository.insertProduct(product);
    }

    errors.push("O supplier_id informado não existe");

    if (errors.length !== 0) {
        //* Mandando para index.js o erro
        throw errors;
     }
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
    const errors = [];
    
    if(await SupplierReposytory.getSupplier(product.supplier_id)) {
        return await ProductRepository.updateProduct(product);
    }

    errors.push("O supplier_id informado não existe");
    //* Se tiver error
   if (errors.length !== 0) {
    //* Mandando para index.js o erro
    throw errors;
 }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}