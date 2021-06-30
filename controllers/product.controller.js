//? Controller vai fazer as validacoes da requisicao
import ProductService from "../services/product.service.js";

async function createProduct(req, res, next) {
    try {
        let product = req.body;
        const errors = [];

        //* validacoes
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            //* Informa mensagem de erro pro usuario
            errors.push("Name, descripption, value, stock e supplier_id sao obrigatorios");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
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
        res.send(await ProductService.getProduct(req.params.id));
        
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
        const errors = [];

        if (!product.productId || !product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            //* Informa mensagem de erro pro usuario
            errors.push("Product_id, name, descripption, value e supplier_id sao obrigatorios");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }
       
        product = await ProductService.updateProduct(product);
        res.send(product);
        
        //* convertendo em string e devolvendo no log o body
        logger.info(`PUT /Product - ${JSON.stringify(product)}`);
    } catch (err) {
        next(err);
    }
}

async function createProductInfo(req, res, next) {
    try {
        const errors = [];
        let productInfo = req.body;

        if(!productInfo.productId) {
            errors.push("ProductId é obrigatorio.");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }

       await ProductService.createProductInfo(productInfo);
        res.end();
        logger.info(`POST /product/info - ${JSON.stringify(productInfo)}`);

    } catch (err) {
        next (err);
    }
}

async function updateProductInfo(req, res, next) {
    try {
        const errors = [];
        let productInfo = req.body;

        if(!productInfo.productId) {
            errors.push("ProductId é obrigatorio.");
        }

        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }

       await ProductService.updateProductInfo(productInfo);
        res.end();
        logger.info(`PUT /product/info - ${JSON.stringify(productInfo)}`);

    } catch (err) {
        next (err);
    }
}

async function createReview(req, res, next){
    const errors = [];

    try {
        let params = req.body;

        if (!params.productId || !params.review) {
            errors.push("ProductId e reviews são obrigatorios.")
        }
        //* Se tiver error
        if (errors.length !== 0) {
            //* Mandando para index.js o erro
            throw errors;
        }

        await ProductService.createReview(params.review, params.productId);
        res.end();

    } catch (err) {
        next(err);
    }
}

async function deleteReview(req, res, next) {
    try {
        await ProductService.deleteReview(req.params.id, req.params.index);
        logger.info(`DELETE /product/${req.params.id}/review/${req.params.index}`);
        res.end();
    } catch (err) {
        next(err);
    }
}

async function getProductsInfo(req, res, next) {
    try {
        res.send(await ProductService.getProductsInfo());
        logger.info("GET /product/info");
    } catch (err) {
        next(err);
    }
}

async function deleteProductInfo(req, res, next) {
    try {
        res.send(await ProductService.deleteProductInfo(parseInt(req.params.id)));
        logger.info("DELETE /product/info");
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
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}