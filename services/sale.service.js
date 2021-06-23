//? Service faz o tratamentoo da regra de negocio / validacoes
import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";

async function createSale(sale) {
    const errors = [];

    //* Se nao existir o Client_id
    if(!await ClientRepository.getClient(sale.client_id)) {
        errors.push("O Client_id informado não existe");
    }

    if (!await ProductRepository.getProduct(sale.product_id)) {
        errors.push("O Product_id informado nao existe");
    }
    //* Se tiver error
   if (errors.length !== 0) {
       //* Mandando para index.js o erro
       throw errors;
    }
    
    //* cria e retorna o objeto
    return await SaleRepository.insertSale(sale);
}

async function getSales() {
    return await SaleRepository.getSales();
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    //* nao coloca return pois nao esta esperando nenhum retorno
    await SaleRepository.deleteSale(id);
}

async function updateSale(sale) {
    if(await SupplierReposytory.getSupplier(sale.supplier_id)) {
        return await SaleRepository.updateSale(sale);
    }
    throw new Error("O supplier_id informado não existe");
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}