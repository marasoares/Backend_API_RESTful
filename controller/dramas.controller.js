const Drama = require("./../models/dramas"); 

exports.getAll = async (req,res) => {
    await Drama.find({}).then((dramas) => {
        res.status(200).json(dramas);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum Livro na categoria DRAMA foi encontrado"});
        console.error(err);
    });
}

exports.getId = async (req,res) => {
    const id = req.params.id;
    if(id.length != 24){
        res.status(400).json({message: "ERROR: O id precisa ter 24 caracteres"});
        return true;
    }
    await Drama.findById(req.params.id).then((drama) => {
        res.status(200).json(drama);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum Livro na categoria DRAMA foi encontrado"});
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
    await Drama.create(req.body).then( () => {
        res.status(201).json({message: "Livro inserido na categoria DRAMA com sucesso!!!"})
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
    await Drama.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "Livro na categoria DRAMA atualizado com sucesso!!!"})
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
    await Drama.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "Livro na categoria DRAMA deletado com sucesso!!!"});
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro foi encontrado na categoria DRAMA"});
        console.error(err);
    });
}