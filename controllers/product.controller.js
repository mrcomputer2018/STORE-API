//? Controller vai fazer as validacoes da requisicao
import ProductService from "../services/supplier.service.js";

async function createProduct(req, res, next) {
    try {
        let product = req.body;

        //* validacoes
        if (!product.name || !product.descripption || !product.value || !product.email || !product.supplier_id) {
            //* Informa mensagem de erro pro usuario
            throw new Error("Name, descripption, value e supplier_id sao obrigatorios");
        }
        //* Cria no banco de dados e retorna o Producte criado
        product = await ProductService.createProduct(product);
        res.send(product);
        //* convertendo em string e devolvendo no log o body
        logger.info(`POST /product - ${JSON.stringify(product)}`);
    } catch (err) {
        //* Jogando ppara o proximo middleware
        next(err);
    }
}

async function getProducts(req, res,next) {
    try {
        //* Devolvendo pro cliente
        res.send(await ProductService.getProducts());

        logger.info("GET /products");

    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        await ProductService.getProduct(req.params.id);
        //* termina sem dar retorno
        res.end();
        logger.info("GET /product/:id");

    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        res.send(await ProductService.deleteProduct(req.params.id));
        logger.info("DELETE /product/:id")

    } catch (err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    try {
        let product = req.body;

        if (!product.product_id || !product.name || !product.descripption || !product.value || !product.email || !product.supplier_id) {
            //* Informa mensagem de erro pro usuario
            throw new Error("Product_id, name, descripption, value e supplier_id sao obrigatorios");
        }
       
        product = await ProductService.updateProduct(product);
        res.send(product);
        
        //* convertendo em string e devolvendo no log o body
        logger.info(`PUT /Product - ${JSON.stringify(product)}`);
    } catch (err) {
        next(err);
    }
}

//* Exportacoes
export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}