//? Controller vai fazer as validacoes da requisicao
import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
    try {
        let client = req.body;

        //* validacoes
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            //* Informa mensagem de erro pro usuario
            throw new Error("Name, cpf, phone e address sao obrigatorios");
        }
        //* Cria no banco de dados e retorna o cliente criado
        res.send(await ClientService.createClient(client));
        //* Devolvendo a informacao pro usuario
        res.send({});

        //* convertendo em string e devolvendo no log o body
        loggers.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        //* Jogando ppara o proximo middleware
        next(err);
    }
}

//* Exportacoes
export default {
    createClient
}