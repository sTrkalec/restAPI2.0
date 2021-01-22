const express = require("express");
const app = express();
const morgan = require("morgan");

const routeProducts = require("./routes/products");
const routePedidos = require("./routes/pedidos");

app.use(morgan("dev"))

app.use("/products", routeProducts);
app.use("/pedidos", routePedidos);

//Quando nao encontra a rota, entra aqu:
app.use((req, res, next)=>{
    const erro = new Error("Nao encontrado");
    erro.status(404);
    next(erro);
});



module.exports = app;