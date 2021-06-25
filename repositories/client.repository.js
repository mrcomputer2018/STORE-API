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
    try {
        return await Client.findAll();
    } catch (err) {
        throw err;
    }
}

async function getClient(id) {
    try {
        //* acha pela PK
        return await Client.findByPk(id);
    } catch (err) {
        throw err;
    }
}

async function deleteClient(id) {
    try {
        await Client.destroy({
            where: {
                clientId: id
            }
        });
    } catch (err) {
        throw err;
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