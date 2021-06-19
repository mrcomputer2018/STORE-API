//? Controller vai fazer as validacoes da requisicao
async function createClient(req, res, next) {
    try {
        let client = req.body;

        //* validacoes
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            
        }
    } catch (err) {
        //* Jogando ppara o proximo middleware
        next(err);
    }
}