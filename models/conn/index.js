const mongoose = require("mongoose");  //importando o mongoose

async function Conn(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_BASE}`,{ // string de conexao ou local ou atlas
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { // tudo certo faz isso
        console.log("MongoDB esta conectado");
    }).catch((err) => { // caso de erro faz isso
        console.error(err);
    });
}

module.exports = Conn; //exporta a conexao