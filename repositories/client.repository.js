import { connect } from "./db.js"
//* Importando Modelo
import Client from "../models/client.model.js";

async function insertClient(client) {
    try {
        return await Client.create(client);
    } catch (err) {
        throw err;
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
        const sql = "SELECT * FROM clients WHERE client_id = $1 RETURNING *";

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
        //* nao coloca RES pois nao esta esperando nenhum retorno

    } catch (err) {
        throw err;

    } finally {
        conn.release();
    }
} 

async function updateClient(client) {
    const conn = await connect();

    try {
        const sql = "UPDATE clients SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 WHERE client_id = $6 RETURNING *";
        const values = [client.name, client.cpf, client.phone, client.email, client.address, client.client_id];
        const res = await conn.query(sql, values);

        return res.rows[0];

    } catch (err) {
        throw err;

    } finally {
        conn.release();    }
}

export default {
    insertClient,
    getClients,
    getClient,
    deleteClient, 
    updateClient 
}