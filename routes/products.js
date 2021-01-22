const express = require("express");
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get("/", (req, res, next) => {
    res.status(200).send({
        mensagem: "Retorna todos os produtos"
    })
});
//INSERE  UM PRODUTO
router.post("/", (req, res, next) => {
    res.status(200).send({
        mensagem: "Insere um produto"
    });
});
//RETORNA OS DADOS DE UM PRODUTO
router.get("/:id_produto", (req, res, next) => {
    const id = req.params.id_produto;

    if (id == "especial") {
         res.status(200).send({
            mensagem: "Voce descobriu um ID especial",
            id: id
        });

    } else{
        res.status(200).send({
            mensagem: "Voce passou um ID"
        });
    }


});

router.patch("/", (req, res, next) => {
    res.status(200).send({
        mensagem: "Produto alterado"
    });
});

router.delete("/", (req, res, next) => {
    res.status(200).send({
        mensagem: "Produto excluido"
    });
});



module.exports = router;