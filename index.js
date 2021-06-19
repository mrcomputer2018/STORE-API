import express from "express";
import clientsRouter from "./routes/client.route.js";
import productsRouter from "./routes/product.route.js";
import suppliersRouter from "./routes/supplier.route.js";
import salesRouter from "./routes/sale.route.js";

const app = express();

//* para express usar json
app.use(express.json());

app.use(cors());

//* Redirecionando todos as requisicoes para client.route
app.use("/client", clientsRouter);
app.use("/product", productsRouter);
app.use("/supplier", suppliersRouter);
app.use("/sale", salesRouter);

app.listen(3000, () => {
    console.log("API Inicializada");
});
