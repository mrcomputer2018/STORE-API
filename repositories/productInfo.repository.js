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

async function getProductInfo(productId){
    const client = getClient();

    try {
        await client.connect();
        await client.db("store").collection("productInfo").findOne(
            {
                productId
            }
        )
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function createReview(review, productId){
    try {
        //* encontro o productId
        const productInfo = await getProductInfo(productInfo);
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo)

    } catch (err) {
        throw err;
    } 
}

export default { createProductInfo, updateProductInfo, getProductInfo, createReview };