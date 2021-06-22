import { connect } from "./db.js"

async function insertClient(client) {
    //* Fazendo a conexao
    const conn = await connect();

    try {
        //* Montando o SQL que executaremos
        //* Returning para retornar o que eu quero
        const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        //* Evitando o ataque de sql injection
        const values = [client.name, client.cpf, client.phone, client.email, client.address];

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

//* Metodo buscar clientes
async function getClients () {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM clients";
        
        const res = await conn.query(sql);
        //* pegando toda a lista de clientes
        return res.rows;

    } catch (error) {
       
        throw err;

    } finally {

        conn.release();
    }
}

async function getClient(id) {
    const conn = await connect();

    try {
        const sql = "SELECT * FROM clients WHERE client_id = $1";

        const values = [id];

        const res = await conn.query(sql, values);

         return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();

    }
}

async function deleteClient(id) {
    const conn = await connect();

    try {
        const sql = "DELETE FROM clients WHERE client_id = $1";

        const values = [id];

        await conn.query(sql, values);

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    }
} 

export default {
    insertClient,
    getClients,
    getClient,
    deleteClient   
}