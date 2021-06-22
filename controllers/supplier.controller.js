//? Controller vai fazer as validacoes da requisicao
import SupplierService from "../services/supplier.service.js";

async function createSupplier(req, res, next) {
    try {
        let supplier = req.body;

        //* validacoes
        if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
            //* Informa mensagem de erro pro usuario
            throw new Error("Name, cnpj, phone e address sao obrigatorios");
        }
        //* Cria no banco de dados e retorna o suppliere criado
        supplier = await SupplierService.createSupplier(supplier);
        res.send(supplier);
        //* convertendo em string e devolvendo no log o body
        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
    } catch (err) {
        //* Jogando ppara o proximo middleware
        next(err);
    }
}

async function getSuppliers(req, res,next) {
    try {
        //* Devolvendo pro cliente
        res.send(await SupplierService.getSuppliers());

        logger.info("GET /suppliers");

    } catch (err) {
        next(err);
    }
}

async function getSupplier(req, res, next) {
    try {
        await SupplierService.getSupplier(req.params.id);
        //* termina sem dar retorno
        res.end();
        logger.info("GET /supplier/:id");

    } catch (err) {
        next(err);
    }
}

async function deleteSupplier(req, res, next) {
    try {
        res.send(await SupplierService.deleteSupplier(req.params.id));
        logger.info("DELETE /supplier/:id")

    } catch (err) {
        next(err);
    }
}

async function updateSupplier(req, res, next) {
    try {
        let supplier = req.body;

        if (!supplier.supplier_id || !supplier.name || !supplier.cpf || !supplier.phone || !supplier.email || !supplier.address) {
            //* Informa mensagem de erro pro usuario
            throw new Error("supplier_id, name, cnpj, phone e address sao obrigatorios");
        }
       
        supplier = await SupplierService.updateSupplier(supplier);
        res.send(supplier);
        
        //* convertendo em string e devolvendo no log o body
        logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
    } catch (err) {
        next(err);
    }
}

//* Exportacoes
export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}