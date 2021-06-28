//? Service faz o tratamentoo da regra de negocio / validacoes
import ProductRepository from "../repositories/product.repository.js";
import SupplierReposytory from "../repositories/supplier.repository.js";
import SaleRepository from "../repositories/sale.repository.js"

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
    const errprs = [];
    const sales = await SaleRepository.getSalesByProductId(id);

    if (sate) {
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