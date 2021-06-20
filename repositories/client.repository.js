import { connect } from "./db.js"

async function insertClient(client) {
    //* Fazendo a conexao
    const conn = await connect();

    //* Montando o SQL que executaremos
    //* Returning para retornar o que eu quero
    const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    //* Evitando o ataque de sql injection
    const values = [client.name, client.cpf, client.phone, client.email, client.address];

    const res = await conn.query(sql, values);
    
    return res.rows[0];
}

export default {
    insertClient
}