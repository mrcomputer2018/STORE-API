import express from "express";
import clientsRouter from "./routes/client.route.js";

const app = express();

//* Redirecionando todos as requisicoes para client.rooute
app.use("/client", clientsRouter);

app.listen(3000, () => {
    console.log("API Inicializada");
});
