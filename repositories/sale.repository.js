import connect from "./db.js"

async function insertSale(sale) {
    //* Fazendo a conexao
    const conn = await connect();

    try {
        //* Montando o SQL que executaremos
        //* Returning para retornar o que eu quero
        const sql = "INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *";
        //* Evitando o ataque de sql injection
        const values = [sale.value, sale.date, sale.client_id, sale.product_id];
        //* Guardadndo em res o objeto alterado
        const res = await conn.query(sql, values);

        return res.rows[0];

    } catch (err) {
        throw err; //* sera jogado para frente e tratado na rota que criamos
    } finally {
        //* Com finally a conexao sempre esra fechada
        //* Realizando o release da conexao
        conn.release();
    }
}

//* Metodo buscar fornecedores
async function getSales () {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM sales";
        
        const res = await conn.query(sql);
        //* pegando toda a lista de produtos
        return res.rows;

    } catch (err) {
       
        throw err;

    } finally {

        conn.release();
    }
}

async function getSalesByProductId(productId) {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM sales WHERE product_id = $1";
        const values = [productId];

        const res = await conn.query(sql, values);
        //* pegando toda a lista de produtos
        return res.rows;

    } catch (err) {
       
        throw err;

    } finally {

        conn.release();
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