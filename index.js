import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/client.route.js";
import productsRouter from "./routes/product.route.js";
import suppliersRouter from "./routes/supplier.route.js";
import salesRouter from "./routes/sale.route.js";

//* Destruction winston
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({
    level,
    message,
    label,
    timestamp
}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

//* Colocando winston como global
//* Transport - para imprimir no console e no arquivo texto
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "store-api.log"})
    ],
    format: combine(
        label({ label: "store-api"}),
        timestamp(),
        myFormat
    )
});

const app = express();

//* para express usar json
app.use(express.json());

//* Liberar somente para o dominio especifico do seu servidor
app.use(cors());

//* Redirecionando todos as requisicoes para client.route
app.use("/client", clientsRouter);
app.use("/product", productsRouter);
app.use("/supplier", suppliersRouter);
app.use("/sale", salesRouter);

//* Configurando o tratamento do erro
app.use((err, req, res) => {
    //* Tempplate string de erro c/ metodo url mensagem de erro
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    //* retorno pro usuario um erro
    res.status(400).send({ error : err.message });
});

//* Iniciando o servidor na porta
app.listen(3000, () => {
    console.log("API Inicializada");
});
