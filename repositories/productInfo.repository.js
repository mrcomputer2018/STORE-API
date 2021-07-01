import { connect } from "./mongo.db.js";
import ProductInfoSchema from "../schemas/productInfo.schema.js";

async function createProductInfo(productInfo) {
    try {
        const mongoose = await connect();

        //* Transformando o schema em modelo
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);

        //* Agora podemos trabalhar com ProductInfo
        productInfo = new ProductInfo(productInfo);
        await productInfo.save();

    } catch (err) {
        throw err;
    }
}

async function updateProductInfo(productInfo) {
    try {
        const mongoose = await connect();

        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);

        //* pesquisa e atualiza
        await ProductInfo.findOneAndUpdate(
            { 
                //* O que procurar
                productId: productInfo.productId 
            }, 
                //* o que eu quero atualizar
                productInfo
        );

    } catch (err) {
        throw err;
    }
}

async function getProductInfo(productId){
    try {
        const mongoose = await connect();

        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
         //* pesquisa e cria a query
        const query = await ProductInfo.findOne(
            { 
                //* O que procurar
                productId: productId 
            }
        );

        return await query.exec();
    
    } catch (err) {
        throw err;
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
    try {
        const mongoose = await connect();

        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
         
        const query = await ProductInfo.find({});

        return await query.exec();
    
    } catch (err) {
        throw err;
    }
}

async function deleteProductInfo(productId) {
    try {
        const mongoose = await connect();

        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
         
        await ProductInfo.deleteOne({ productId });
    
    } catch (err) {
        throw err;
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