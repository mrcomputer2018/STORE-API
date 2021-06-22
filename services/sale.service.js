//? Service faz o tratamentoo da regra de negocio / validacoes
import SaleRepository from "../repositories/sale.repository.js";
import ClientReposytory from "../repositories/client.repository.js";
import ProductReposytory from "../repositories/product.repository.js";

async function createSale(sale) {
    if(await SupplierReposytory.getSupplier(sale.supplier_id)) {
        //* cria e retorna o objeto
        return await SaleRepository.insertSale(sale);
    }
    throw new Error("O supplier_id informado não existe");
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