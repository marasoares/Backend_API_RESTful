const Juridico = require("./../models/juridicos"); 

exports.getAll = async (req,res) => {
    await Juridico.find({}).then((juridicos) => {
        res.status(200).json(juridicos);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro na categoria JURÍDICO foi encontrado"});
        console.error(err);
    });
}

exports.getId = async (req,res) => {
    const id = req.params.id;
    if(id.length != 24){
        res.status(400).json({message: "ERROR: O id precisa ter 24 caracteres"});
        return;
    }
    await Juridico.findById(req.params.id).then((juridico) => {
        res.status(200).json(juridico);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum Livro na categoria JURÍDICO foi encontrado"});
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
    await Juridico.create(req.body).then( () => {
        res.status(201).json({message: "Livro inserido na categoria JURÍDICO com sucesso!!!"})
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
    await Juridico.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "Livro na categoria JURÍDICO atualizado com sucesso!!!"})
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
    await Juridico.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "Livro na categoria JURÍDICO deletado com sucesso!!!"});
    }).catch((err) => {
        res.status(404).json({message: "Nenhum livro foi encontrado na categoria JURÍDICO"});
        console.error(err);
    });
}