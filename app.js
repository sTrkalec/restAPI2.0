const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routeProducts = require("./routes/products");
const routePedidos = require("./routes/pedidos");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body 

app.use((req, res, next)=>{
    res.header("Acces-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Header",
    "Origin, X-Requrested-With, Content-Type");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).send({});
    }

    next();

});

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