import connect from "./db.js"

async function insertProduct(product) {
    //* Fazendo a conexao
    const conn = await connect();

    try {
        //* Montando o SQL que executaremos
        //* Returning para retornar o que eu quero
        const sql = "INSERT INTO products (name, description, value, stock, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        //* Evitando o ataque de sql injection
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id];
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
async function getProducts () {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM products";
        
        const res = await conn.query(sql);
        //* pegando toda a lista de produtos
        return res.rows;

    } catch (error) {
       
        throw err;

    } finally {

        conn.release();
    }
}

async function getProduct(id) {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM products WHERE product_id = $1";

        const values = [id];

        const res = await conn.query(sql, values);

         return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();

    }
}

async function deleteProduct(id) {
    const conn = await connect();

    try {
        const sql = "DELETE FROM products WHERE product_id = $1";

        const values = [id];

        await conn.query(sql, values);
        //* nao coloca RES pois nao esta esperando nenhum retorno

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    }
} 

async function updateProduct(product) {
    const conn = await connect();

    try {
        const sql = "UPDATE products SET name = $1, description = $2, value = $3, stock = $4, supplier_id = $5 WHERE product_id = $6 RETURNING *";
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id, product.product_id];
        const res = await conn.query(sql, values);

        return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    
    }
}

export default {
    insertProduct,
    getProducts,
    getProduct,
    deleteProduct, 
    updateProduct 
}