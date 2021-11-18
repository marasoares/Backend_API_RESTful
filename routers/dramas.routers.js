const express = require("express"); //import do express
const router = express.Router(); //define app como express
const DramaController = require('./../controller/dramas.controller'); // importacao do controller

router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Livros categoria DRAMA ok"});
});

router.get("/listAll", DramaController.getAll);

router.get("/listId/:id", DramaController.getId);

router.post("/add", DramaController.postAdd);

router.put("/update/:id", DramaController.putUpdate);

router.delete("/delete/:id", DramaController.delDelete);

module.exports = router;