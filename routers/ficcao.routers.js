const express = require("express"); //import do express
const router = express.Router(); //define app como express
const FiccaoController = require('./../controller/ficcao.controller'); // importacao do controller

router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Livros categoria Ficção Científica ok"});
});

router.get("/listall", FiccaoController.getAll);

router.get("/listid/:id", FiccaoController.getId);

router.post("/add", FiccaoController.postAdd);

router.put("/update/:id", FiccaoController.putUpdate);

router.delete("/delete/:id", FiccaoController.delDelete);

module.exports = router;