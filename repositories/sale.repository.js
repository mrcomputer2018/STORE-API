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
                    model: Product
                },
                {
                    model: Client
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
                }
            }
        );

    } catch (err) {
       throw err;

    } 
}


async function getSale(id) {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM sales WHERE sale_id = $1";

        const values = [id];

        const res = await conn.query(sql, values);

         return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();

    }
}

async function deleteSale(id) {
    const conn = await connect();

    try {
        const sql = "DELETE FROM sales WHERE sale_id = $1";

        const values = [id];

        await conn.query(sql, values);
        //* nao coloca RES pois nao esta esperando nenhum retorno

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    }
} 

async function updateSale(sale) {
    const conn = await connect();

    try {
        const sql = "UPDATE sales SET value = $1, date = $2, client_id = $3, product_id = $4 WHERE sale_id = $5 RETURNING *";
        const values = [sale.value, sale.date, sale.client_id, sale.product_id, sale.sale_id];
        const res = await conn.query(sql, values);

        return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    
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