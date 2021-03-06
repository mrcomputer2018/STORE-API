//? Controller vai fazer as validacoes da requisicao
import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
    try {
        let client = req.body;
        const errors = [];

        //* validacoes
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            //* Informa mensagem de erro pro usuario
            errors.push("Name, cpf, phone e address sao obrigatorios");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }
        
        //* Cria no banco de dados e retorna o cliente criado
        client = await ClientService.createClient(client);
        res.send(client);
        //* convertendo em string e devolvendo no log o body
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        //* Jogando ppara o proximo middleware
        next(err);
    }
}

async function getClients(req, res,next) {
    try {
        //* Devolvendo pro cliente
        res.send(await ClientService.getClients());

        logger.info("GET /clients");

    } catch (err) {
        next(err);
    }
}

async function getClient(req, res, next) {
    try {
        await ClientService.getClient(req.params.id);
        //* termina sem dar retorno
        res.end();
        logger.info("GET /Client/:id");

    } catch (err) {
        next(err);
    }
}

async function deleteClient(req, res, next) {
    try {
        res.send(await ClientService.deleteClient(req.params.id));
        logger.info("DELETE /client/:id")

    } catch (err) {
        next(err);
    }
}

async function updateClient(req, res, next) {
    try {
        let client = req.body;
        const errors = [];

        if (!client.clientId || !client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            //* Informa mensagem de erro pro usuario
            errors.push("ClientId, name, cpf, phone e address sao obrigatorios");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }

        client = await ClientService.updateClient(client);
        res.send(client);
        
        //* convertendo em string e devolvendo no log o body
        logger.info(`PUT /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

//* Exportacoes
export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}