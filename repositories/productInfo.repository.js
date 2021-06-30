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
        await client.db("store").collection("productInfo").findOne({productId})
        
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function createReview(review, productId){
    try {
        //* encontro o productId
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);

    } catch (err) {
        throw err;
    } 
}

async function deleteReview(productId, index) {
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.splice(index, 1);
        await updateProductInfo(productInfo);
    } catch (err) {
        throw err;
    }
}

async function getProductsInfo() {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").find({}).toArray();
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function deleteProductInfo(productId) {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").deleteOne({ productId });
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

export default { 
                    createProductInfo, 
                    updateProductInfo, 
                    getProductInfo, 
                    createReview,
                    deleteReview,
                    getProductsInfo,
                    deleteProductInfo
                }