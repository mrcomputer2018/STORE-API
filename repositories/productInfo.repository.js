import { getClient } from "./mongo.db.js";

async function createProductInfo(productInfo) {
    const client = getClient();
    try {
        await client.connect();
        await client.db("store").collection("productInfo").insertOne(productInfo);

    } catch (err) {
        throw err;
    } finally {
        //* fechando conexao com o banco
        await client.close();
    }
}

async function updateProductInfo(productInfo) {
    const client = getClient();

    try {
        await client.connect();
        await client.db("store").collection("productInfo").updateOne(
            {
                productId: productInfo.productId
            },
            {
                //* Quais informacoes vou alterar
                $set: {...productInfo}
            }
        )
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

export default { createProductInfo };