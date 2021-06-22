//? Routesr envia as requisicoes para controller
import express from "express";
import SaleController from "../controllers/sale.controller.js";

//* Criando o roteador para receber as requisicoes
const router = express.Router();

//* Rota POST passando a funcao como parametro
router.post("/", SaleController.createSale);

//* Rota GET  passando a funcao como parametro
router.get("/", SaleController.getSales);
router.get("/:id", SaleController.getSale);

//* Rota DELETE passando a funcao como parametro
router.delete("/:id", SaleController.deleteSale);

//* Rota PUT
router.put("/", SaleController.updateSale);

//* Exportando o roteador
export default router;