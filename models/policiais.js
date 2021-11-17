const mongoose = require("mongoose");  //importando o mongoose

const policiaisModel = new mongoose.Schema({
    nome: { type: String, required: true},
    autor: { type: String, required: true},
    editora: { type: String, required: true},
    paginas: { type: Number, requires: true},
    anoLancamento: { type: Number, required: true},
    imagemUrl: { type: String, required: true},
    dataCriacao: { type: Date, default: Date.now }
});

const Policial = mongoose.model("policiais",policiaisModel);

module.exports = Policial;