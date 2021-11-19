const Policial = require("./../models/policiais"); 

exports.getAll = async (req,res) => {
    await Policial.find({}).then((policiais) => {
        res.status(200).json(policiais);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro na categoria POLICIAL foi encontrado"});
        console.error(err);
    });
}

exports.getId = async (req,res) => {
    const id = req.params.id;
    if(id.length != 24){
        res.status(400).json({message: "ERROR: O id precisa ter 24 caracteres"});
        return;
    }
    await Policial.findById(req.params.id).then((policial) => {
        res.status(200).json(policial);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum Livro na categoria POLICIAL foi encontrado"});
        console.error(err);
    });
}

exports.postAdd = async (req,res) => {
    const requisicao = req.body;
    if(!requisicao.nome){
        res.status(400).json({message: "Nome do livro não foi inserido na requisicao"});
        return;
    }if(!requisicao.autor){
        res.status(400).json({message: "Autor do livro não foi inserido na requisição"});
        return;
    }if(!requisicao.editora){
        res.status(400).json({message: "Editora do livro não inserida na requisição"});
        return;
    }if(!requisicao.paginas){
        res.status(400).json({message: "Número de págnias não inserido na requisição"});
        return;
    }if(!requisicao.imagemUrl){
        res.status(400).json({message: "A URL da imagem não foi inserida na requisição"});
        return;
    }
    await Policial.create(req.body).then( () => {
        res.status(201).json({message: "Livro inserido na categoria POLICIAL com sucesso!!!"})
    }).catch((err) => {
        res.status(400).json({message: "Algo esta errado"});
        console.error(err);
    });
}

exports.putUpdate = async (req,res) => {
    const requisicao = req.body;
    const id = req.params.id;
    if(id.length != 24){
        res.status(400).json({message: "ERROR: O id precisa ter 24 caracteres"});
        return;
    }
    if(!requisicao.nome){
        res.status(400).json({message: "Nome do livro não foi inserido na requisicao"});
        return;
    }if(!requisicao.autor){
        res.status(400).json({message: "Autor do livro não foi inserido na requisição"});
        return;
    }if(!requisicao.editora){
        res.status(400).json({message: "Editora do livro não inserida na requisição"});
        return;
    }if(!requisicao.paginas){
        res.status(400).json({message: "Número de págnias não inserido na requisição"});
        return;
    }if(!requisicao.imagemUrl){
        res.status(400).json({message: "A URL da imagem não foi inserida na requisição"});
        return;
    }
    await Policial.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "Livro na categoria POLICIAL atualizado com sucesso!!!"})
    }).catch((err) => {
        res.status(400).json({message: "Algo deu errado!!!"});
        console.error(err);
    });
}

exports.delDelete = async (req,res) => {
    const id = req.params.id;
    if(id.length != 24){
        res.status(400).json({message: "ERROR: O id precisa ter 24 caracteres"});
        return;
    }
    await Policial.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "Livro na categoria POLICIAL deletado com sucesso!!!"});
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro foi encontrado na categoria POLICIAL"});
        console.error(err);
    });
}