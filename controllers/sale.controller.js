//? Controller vai fazer as validacoes da requisicao
import SaleService from "../services/sale.service.js";

async function createSale(req, res, next) {
    try {
        let sale = req.body;
        const errors = [];

        //* validacoes
        if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
            //* Informa mensagem de erro pro usuario
           errors.push("Value, date, value, client_id e product_id sao obrigatorios");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }

        //* Cria no banco de dados e retorna o Salee criado
        sale = await SaleService.createSale(sale);
        res.send(sale);
        //* convertendo em string e devolvendo no log o body
        logger.info(`POST /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        //* Jogando ppara o proximo middleware
        next(err);
    }
}

async function getSales(req, res,next) {
    try {
        //* Devolvendo pro cliente
        res.send(await SaleService.getSales(req.query.productId));

        logger.info("GET /sales");

    } catch (err) {
        next(err);
    }
}

async function getSale(req, res, next) {
    try {
        await SaleService.getSale(req.params.id);
        //* termina sem dar retorno
        res.end();
        logger.info("GET /sale/:id");

    } catch (err) {
        next(err);
    }
}

async function deleteSale(req, res, next) {
    try {
        res.send(await SaleService.deleteSale(req.params.id));
        logger.info("DELETE /sale/:id")

    } catch (err) {
        next(err);
    }
}

async function updateSale(req, res, next) {
    try {
        let sale = req.body;
        const errors = [];

        if (!sale.saleId || !sale.value || !sale.date || !sale.clientId || !sale.productId) {
            //* Informa mensagem de erro pro usuario
            errors.push("Sale_id, value, date, client_id e product_id sao obrigatorios");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }
       
        sale = await SaleService.updateSale(sale);
        res.send(sale);
        
        //* convertendo em string e devolvendo no log o body
        logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        next(err);
    }
}

//* Exportacoes
export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}