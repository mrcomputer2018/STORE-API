//? Service faz o tratamentoo da regra de negocio
import ClientRepository from "../repositories/client.repository.js";

async function createClient(client) {
    //* cria e retorna o objeto
    return await ClientRepository.insertClient(client);
}

async function getClients() {
    return await ClientRepository.getClients();
}

async function getClient(id) {
    return await ClientRepository.getClient(id);
}

export default {
    createClient,
    getClients,
    getClient
}