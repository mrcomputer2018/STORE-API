//? Routesr envia as requisicoes para controller
import express from "express";
import ClientController from "../controllers/client.controller.js";

//* Criando o roteador para receber as requisicoes
const router = express.Router();

//* Rota POST
router.post("/", ClientController.createClient);

//* Exportando o roteador
export default router;