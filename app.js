const express = require("express");
const app = express();
const morgan = require("morgan");

const routeProducts = require("./routes/products");
const routePedidos = require("./routes/pedidos");

app.use(morgan("dev"));

app.use("/produtos", routeProducts);
app.use("/pedidos", routePedidos);

//Quando nao encontra a rota, entra aqu:
app.use((req, res, next)=>{
    const erro = new Error("Nao encontrado");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
   res.status (error.status || 500);
   return res.send({
        erro: {
            mensagem: error.message
        }
   });
});



module.exports = app;