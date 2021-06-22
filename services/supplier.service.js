//? Service faz o tratamentoo da regra de negocio
import SupplierRepository from "../repositories/supplier.repository.js";

async function createSupplier(supplier) {
    //* cria e retorna o objeto
    return await SupplierRepository.insertSupplier(supplier);
}

async function getSuppliers() {
    return await SupplierRepository.getSuppliers();
}

async function getSupplier(id) {
    return await SupplierRepository.getSupplier(id);
}

async function deleteSupplier(id) {
    //* nao coloca return pois nao esta esperando nenhum retorno
    await SupplierRepository.deleteSupplier(id);
}

async function updateSupplier(supplier) {
    return await SupplierRepository.updateSupplier(supplier);
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}