//? Routesr envia as requisicoes para controller
import express from "express";
import SupplierController from "../controllers/supplier.controller.js";

//* Criando o roteador para receber as requisicoes
const router = express.Router();

//* Rota POST passando a funcao como parametro
router.post("/", SupplierController.createSupplier);

//* Rota GET  passando a funcao como parametro
router.get("/", SupplierController.getSuppliers);
router.get("/:id", SupplierController.getSupplier);

//* Rota DELETE passando a funcao como parametro
router.delete("/:id", SupplierController.deleteSupplier);

//* Rota PUT
router.put("/", SupplierController.updateSupplier);

//* Exportando o roteador
export default router;