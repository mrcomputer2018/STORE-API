//* Importando Modelo
import Product from "../models/product.model.js";

async function insertProduct(product) {
    try {
        return await Product.create(product);
    } catch (err) {
        throw err;
    }
}

//* Metodo buscar productes
async function getProducts () {
    try {
        return await Product.findAll();
    } catch (err) {
        throw err;
    }
}

async function getProduct(id) {
    try {
        //* acha pela PK
        //* RAW converte para JSON
        return await Product.findByPk(id, { raw: true });
    } catch (err) {
        throw err;
    }
}

async function deleteProduct(id) {
    try {
        await Product.destroy({
            where: {
                productId: id
            }
        });
    } catch (err) {
        throw err;
    }
} 

async function updateProduct(product) {
    try {
       await Product.update(product, {
           where: {
               productId: product.productId
           }
       });
       return await getProduct(product.productId);

    } catch (err) {
        throw err;
    }
}

export default {
    insertProduct,
    getProducts,
    getProduct,
    deleteProduct, 
    updateProduct 
}