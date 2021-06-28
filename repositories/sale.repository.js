//* Importando Modelo
import Sale from "../models/sale.model.js";
//* Importando o model para inculde funcionar
import Product from "../models/product.model.js";
import Client from "../models/client.model.js"

async function insertSale(sale) {
    
    try {
        return await Sale.create(sale);

    } catch (err) {
        throw err; //* sera jogado para frente e tratado na rota que criamos
    } 
}

//* Metodo buscar fornecedores
async function getSales () {
   
    try {
        //* Include para trazer o objeto da chave estrangeira
        return await Sale.findAll({
            include: [
                {
                    model: Client
                },
                {
                    model: Product
                }
            ]
        });

    } catch (err) {
        throw err;

    } 
}

async function getSalesByProductId(productId) {
   
    try {
        return await Sale.findAll(
            {
                where: {
                    productId: productId
                },
                include: [
                    {
                        model: Client
                    },
                    {
                        model: Product
                    }
                ]
            }
        );

    } catch (err) {
       throw err;

    } 
}


async function getSale(id) {
    
    try {
        return await Sale.findByPk(id);

    } catch (err) {
        throw err;

    } 
}

async function deleteSale(id) {
   
    try {
        await Sale.destroy({
            where: {
                saleId: id
            }
        });

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    }
} 

async function updateSale(sale) {
   
    try {
        //* Nao alterar SaleId para evitar inconsistencias
        await Sale.update({
                //* campos que quero atualizar
                value: sale.value,
                date: sale.date,
                clientId: sale.clientId
            }, 
            {
            where: {
               saleId: sale.saleId
            }
        });

        //* Retornando a venda atualizada pro usuario
        return await getSale(sale.saleId)

    } catch (err) {
        throw err;

    } 
}

export default {
    insertSale,
    getSales,
    getSalesByProductId,
    getSale,
    deleteSale, 
    updateSale 
}