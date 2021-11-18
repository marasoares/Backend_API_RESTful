const express = require("express"); //import do express
const router = express.Router(); //define app como express
const JuridicoController = require('./../controller/juridicos.controller'); // importacao do controller

router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Livros categoria Jurídicos ok"});
});

router.get("/listall", JuridicoController.getAll);

router.get("/listid/:id", JuridicoController.getId);

router.post("/add", JuridicoController.postAdd);

router.put("/update/:id", JuridicoController.putUpdate);

router.delete("/delete/:id", JuridicoController.delDelete);

module.exports = router;