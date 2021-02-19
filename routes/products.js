const express = require("express");
const router = express.Router();
const mysql = require ("../mysql").pool;

//RETORNA TODOS OS PRODUTOS
router.get("/", (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error : error}) };
        conn.query(
            "SELECT * FROM produtos",
            (error, resultado, fields) =>{
                if (error) { return res.status(500).send({error : error}) };

                return res.status(200).send({response: resultado})
            }
        )


    })
});



//INSERE  UM PRODUTO
router.post("/", (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({error : error}) };
        conn.query(
            "INSERT INTO produtos (nome, preco) VALUES (?,?)",
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({error : error}) };

                res.status(201).send({
                    mensagem: "produtos inserido com sucesso",
                    id_produto: resultado.insertiD
                });
            }
        )
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