const Infantil = require("./../models/infantis"); 

function validaEntrada(requisicao,res){
    if(!requisicao.nome){
        res.status(400).json({message: "Nome do livro não foi inserido na requisicao"});
        return true;
    }if(!requisicao.autor){
        res.status(400).json({message: "Autor do livro não foi inserido na requisição"});
        return true;
    }if(!requisicao.editora){
        res.status(400).json({message: "Editora do livro não inserida na requisição"});
        return true;
    }if(!requisicao.paginas){
        res.status(400).json({message: "Número de págnias não inserido na requisição"});
        return true;
    }if(!requisicao.imagemUrl){
        res.status(400).json({message: "A URL da imagem não foi inserida na requisição"});
        return true;
    }
    // }else if(!requisicao.imagemUrl){
        // res.status(400).json({message: "a URL da imagem não foi inserida na requisicao"});
        // return true;
    // }
}

function validaID(res,id){
    if(id.length != 24){
        res.status(400).json({message: "ERROR: O id precisa ter 24 caracteres"});
        return true;
    }
}

exports.getAll = async (req,res) => {
    await Infantil.find({}).then((infantis) => {
        res.status(200).json(infantis);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro na categoria INFANTIS foi encontrado"});
        console.error(err);
    });
}

exports.getId = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    await Infantil.findById(req.params.id).then((infantil) => {
        res.status(200).json(infantil);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum Livro na categoria INFANTIS foi encontrado"});
        console.error(err);
    });
}

exports.postAdd = async (req,res) => {
    if(validaEntrada(res,req.body)) return;
    await Infantil.create(req.body).then( () => {
        res.status(201).json({message: "Livro inserido na categoria INFANTIS com sucesso!!!"})
    }).catch((err) => {
        res.status(400).json({message: "Algo esta errado"});
        console.error(err);
    });
}

exports.putUpdate = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    if(validaEntrada(res,req.body)) return;
    await Infantil.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "Livro na categoria INFANTIS atualizado com sucesso!!!"})
    }).catch((err) => {
        res.status(400).json({message: "Algo deu errado!!!"});
        console.error(err);
    });
}

exports.delDelete = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    await Infantil.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "Livro na categoria INFANTIS deletado com sucesso!!!"});
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro foi encontrado na categoria INFANTIS"});
        console.error(err);
    });
}