const express = require("express"); //import do express
const router = express.Router(); //define app como express
const PolicialController = require('./../controller/policiais.controller'); // importacao do controller

router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Livros categoria Policial ok"});
});

router.get("/listall", PolicialController.getAll);

router.get("/listid/:id", PolicialController.getId);

router.post("/add", PolicialController.postAdd);

router.put("/update/:id", PolicialController.putUpdate);

router.delete("/delete/:id", PolicialController.delDelete);

module.exports = router;