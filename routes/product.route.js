//? Routesr envia as requisicoes para controller
import express from "express";
import ProductController from "../controllers/product.controller.js";

//* Criando o roteador para receber as requisicoes
const router = express.Router();

//* Rota POST passando a funcao como parametro
router.post("/", ProductController.createProduct);

//* Rota GET  passando a funcao como parametro
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);

//* Rota DELETE passando a funcao como parametro
router.delete("/:id", ProductController.deleteProduct);

//* Rota PUT
router.put("/", ProductController.updateProduct);

//* Rota POST INFO
router.post("/info", ProductController.createProductInfo);

//* Rota PUT INFO
router.put("/info", ProductController.createProductInfo);

//* Exportando o roteador
export default router;