const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
app.use(express.json());

const Conn = require("./models/conn/index");

Conn();

app.use(cors());
app.options("*", cors());

app.get('/', (req,res) => {
    res.status(200).json({message:"API Livros ok"});
});

const InfantisRouter = require("./routers/infantis.routes");
app.use("/infantis", InfantisRouter);

const FiccaoRouter = require("./routers/ficcao.routes");
app.use("/ficcao", FiccaoRouter);

const PoliciaisRouter = require("./routers/policiais.routes");
app.use("/policiais", PoliciaisRouter);

const DramasRouter = require("./routers/dramas.routes");
app.use("/dramas", DramasRouter);

const JuridicosRouter = require("./routers/juridicos.routes");
app.use("/juridicos", JuridicosRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
