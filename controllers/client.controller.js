

//? Controller vai fazer as validacoes da requisicao
async function createClient(req, res, next) {
    try {
        let client = req.body;

        //* validacoes
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            //* Informa mensagem de erro pro usuario
            throw new Error("Name, cpf, phone e address sao obrigatorios");
        }
        // client.service
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