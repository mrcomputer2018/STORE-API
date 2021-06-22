//? Routesr envia as requisicoes para controller
import express from "express";
import ClientController from "../controllers/client.controller.js";

//* Criando o roteador para receber as requisicoes
const router = express.Router();

//* Rota POST passando a funcao como parametro
router.post("/", ClientController.createClient);

//* Rota GET  passando a funcao como parametro
router.get("/", ClientController.getClients);
router.get("/:id", ClientController.getClient);

//* Rota DELETE passando a funcao como parametro
router.delete("/:id", ClientController.deleteClient);

//* Exportando o roteador
export default router;