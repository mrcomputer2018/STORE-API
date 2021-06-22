import { connect } from "./db.js"

async function insertSupplier(supplier) {
    //* Fazendo a conexao
    const conn = await connect();

    try {
        //* Montando o SQL que executaremos
        //* Returning para retornar o que eu quero
        const sql = "INSERT INTO suppliers (name, cpnj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        //* Evitando o ataque de sql injection
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address];
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
async function getSuppliers () {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM suppliers";
        
        const res = await conn.query(sql);
        //* pegando toda a lista de fornecedores
        return res.rows;

    } catch (error) {
       
        throw err;

    } finally {

        conn.release();
    }
}

async function getSupplier(id) {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM suppliers WHERE supplier_id = $1";

        const values = [id];

        const res = await conn.query(sql, values);

         return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();

    }
}

async function deleteSupplier(id) {
    const conn = await connect();

    try {
        const sql = "DELETE FROM suppliers WHERE supplier_id = $1";

        const values = [id];

        await conn.query(sql, values);
        //* nao coloca RES pois nao esta esperando nenhum retorno

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    }
} 

async function updateSupplier(supplier) {
    const conn = await connect();

    try {
        const sql = "UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE supplier_id = $6 RETURNING *";
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address, supplier.supplier_id];
        const res = await conn.query(sql, values);

        return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    
    }
}

export default {
    insertSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier, 
    updateSupplier 
}