const express = require("express"); //import do express
const router = express.Router(); //define app como express
const InfantilController = require('./../controller/infantis.controller'); // importacao do controller

router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Livros categoria Infantis ok"});
});

router.get("/listall", InfantilController.getAll);

router.get("/listid/:id", InfantilController.getId);

router.post("/add", InfantilController.postAdd);

router.put("/update/:id", InfantilController.putUpdate);

router.delete("/delete/:id", InfantilController.delDelete);

module.exports = router;