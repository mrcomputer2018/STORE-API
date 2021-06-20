import { connect } from "./db.js"

async function insertClient(client) {
    //* Fazendo a conexao
    const conn = await connect();

    //* Montando o SQL que executaremos
    const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5)";
    //* Evitando o ataque de sql injection
    const values = [client.name, client.cpf, client.phoone, client.email, client.address];

    const res = await conn.query(sql,values);
    return {};
}

export default {
    insertClient
}