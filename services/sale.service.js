//? Service faz o tratamentoo da regra de negocio / validacoes
import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";

async function createSale(sale) {
    const errors = [];

    //* Se nao existir o Client_id
    if(!await ClientRepository.getClient(sale.clientId)) {
        errors.push("O Client_id informado não existe");
    }
    //*consumindo banco de dados uma vez somente
    const product = await ProductRepository.getProduct(sale.productId);

    if (!product) {
        errors.push("O Product_id informado nao existe");
    }
   
    //* Validacao de estoque
    if(product.stock > 0) {
        //* cria e retorna o objeto
        sale =  await SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return sale;
    }
    else {
        errors.push("Estoque insuficiente");
    }

    //* Se tiver error
    if (errors.length !== 0) {
        //* Mandando para index.js o erro
        throw errors;
    }
    
}

async function getSales(productId, supplierId) {
    if(productId){
        return await SaleRepository.getSalesByProductId(productId);
    }
    if(supplierId) {
        //* Retorna vendas de um determinado fornecedor
        return await SaleRepository.getSalesBySupplierId(supplierId);
    }
    
    return await SaleRepository.getSales();
   
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    const errors = [];
    const sale = await SaleRepository.getSale(id);

    if (sale) {
        //* Pegar oo produto para manipular o estoque
        const product = await ProductRepository.getProduct(sale.productId);
        //* nao coloca return pois nao esta esperando nenhum retorno 
        //* exclusao da venda
        await SaleRepository.deleteSale(id);
        product.stock++;
        //* Atualiza o prooduto em estoque
        await ProductRepository.updateProduct(product);
    }
    else {
        errors.push("Este sale_id não existe.");

        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }
    }

    

}

async function updateSale(sale) {
    const errors = [];

    if (!await SaleRepository.getSale(sale.saleId)) {
        errors.push("O Sale_id informado não existe");
    }
    //* Se nao existir o Client_id
    if(!await ClientRepository.getClient(sale.clientId)) {
        errors.push("O Client_id informado não existe");
    }

    if (!await ProductRepository.getProduct(sale.productId)) {
        errors.push("O Product_id informado nao existe");
    }
    //* Se tiver error
   if (errors.length !== 0) {
       //* Mandando para index.js o erro
       throw errors;
    }

    return await SaleRepository.updateSale(sale);
   
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}