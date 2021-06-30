//? Service faz o tratamentoo da regra de negocio / validacoes
import ProductRepository from "../repositories/product.repository.js";
import SupplierReposytory from "../repositories/supplier.repository.js";
import SaleRepository from "../repositories/sale.repository.js";
import ProductInfoRepository from "../repositories/productInfo.repository.js";

async function createProduct(product) {
    const errors = [];

    if(await SupplierReposytory.getSupplier(product.supplierId)) {
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
    const product = await ProductRepository.getProduct(id);

    //* Converter para inteiro o ID devido ao mongodb
    product.info = await ProductInfoRepository.getProductInfo(parseInt(id));

    return product; 
}

async function deleteProduct(id) {
    const errors = [];
    const sales = await SaleRepository.getSalesByProductId(id);

    if (sales.length > 0) {
      errors.push("Não é possivel excluir este produto. Ja esxiste uma venda vinculada.");
    }

    if (errors.length !== 0) {
        //* Mandando para index.js o erro
        throw errors;
     }

    //* nao coloca return pois nao esta esperando nenhum retorno
    await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
    const errors = [];
    
    if(await SupplierReposytory.getSupplier(product.supplierId)) {
        return await ProductRepository.updateProduct(product);
    }

    errors.push("O supplier_id informado não existe");

    //* Se tiver error
   if (errors.length !== 0) {
    //* Mandando para index.js o erro
    throw errors;
    }
}

async function createProductInfo(productInfo) {
    await ProductInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {
    await ProductInfoRepository.updateProductInfo(productInfo);
}

async function createReview(review, productId) {
    await ProductInfoRepository.createReview(review, productId);
}

async function deleteReview(productId, index) {
    await ProductInfoRepository.deleteReview(parseInt(productId), index);    
}

async function getProductsInfo() {
    return await ProductInfoRepository.getProductsInfo();
}

async function deleteProductInfo(productId) {
    await ProductInfoRepository.deleteProductInfo(productId);
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}