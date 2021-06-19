import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/client.route.js";
import productsRouter from "./routes/product.route.js";
import suppliersRouter from "./routes/supplier.route.js";
import salesRouter from "./routes/sale.route.js";

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
        new (winston.transports.File)({ filename: "my-bank-api.log"})
    ],
    format: combine(
        label({ label: "my-bank-api"}),
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

app.listen(3000, () => {
    console.log("API Inicializada");
});
