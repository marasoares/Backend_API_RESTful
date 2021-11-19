### Integração Backend e Frontend com Mango Atlas e Deploy no Heroku

API criada para organização de `Livros` por categoria, sendo utilizadas, como exemplo, as categorias: 

1. Dramas;
2. Ficção Científica;
3. Infantis;
4. Jurídicos e
5. Policiais.

Categorias definidas, partimos para criação das rotas utilizando o padrão de pastas MVC, onde na pasta routers, definimos cada uma de acordo com a categoria:

`dramas.routers.js`

`ficcao.routers.js`

`infantis.routers.js`

`juridicos.routers.js`

`policiais.routers.js`

Após a definição das rotas, ainda na pasta `routers`, criamos as subrotas do CRUD, seguindo o padrão definido pelo cliente:

- `GET/listAll` utilizada para listar todos os objetos inseridos no Mongo Atlas:

  ```javascript
  router.get("/listAll", DramaController.getAll);
  ```



- `GET/listId`utilizada para listar o objeto relacionado ao Id informado pelo usuário:

  ```javascript
  router.get("/listId/:id", DramaController.getId);
  ```



- `POST/add` para adicionar um novo objeto no Mongo Atlas:

  ```javascript
  router.post("/add", DramaController.postAdd);
  ```



- `PUT/update` para atualização de um objeto no Mongo Atlas:

  ```javascript
  router.put("/update/:id", DramaController.putUpdate);
  ```

  

- `DEL/delete` para exclusão de um objeto no Mongo Atlas:

  ```javascript
  router.delete("/delete/:id", DramaController.delDelete);
  ```

Cada rota foi exportada para o `index.js` da raiz do projeto através do `module.exports = router`, sendo utilizadas através de variáveis locais:

```javascript
const InfantisRouter = require("./routers/infantis.routers");
app.use("/infantis", InfantisRouter);

const FiccaoRouter = require("./routers/ficcao.routers");
app.use("/ficcao", FiccaoRouter);

const PoliciaisRouter = require("./routers/policiais.routers");
app.use("/policiais", PoliciaisRouter);

const DramasRouter = require("./routers/dramas.routers");
app.use("/dramas", DramasRouter);

const JuridicosRouter = require("./routers/juridicos.routers");
app.use("/juridicos", JuridicosRouter);

```



Como já mencionado, o armazenamento dos objetos foi realizado pelo **Mongo Atlas**, podendo, assim, ser acessado por outros usuários, tendo em vista não ser um banco de dados local, mas sim externo. Para isso, fizemos a importação do mongoose, em cada arquivo (categoria de livros) da pasta `models`:

```javascript
const mongoose = require("mongoose");
```

   

Dessa forma, para auxílio de como utilizar e os dados aceitos, criamos a pasta `models` com as informações dos campos exigidos e o tipo de dados aceitos, conforme abaixo:

```javascript
const dramasModel = new mongoose.Schema({
    nome: { type: String, required: true},
    autor: { type: String, required: true},
    editora: { type: String, required: true},
    paginas: { type: Number, requires: true},
    anoLancamento: { type: Number, required: true},
    imagemUrl: { type: String, required: true},
    dataCriacao: { type: Date, default: Date.now }
});

```



Seguindo o padrão MVC, na pasta `controller` fizemos todas as validações de cada subrota do CRUD, minimizando o risco da inclusão, atualização ou exclusão de dados ocorrer de maneira equivocada.

Sendo assim, no método `GET`utilzamos a subrota `listAll`, exportandoa mesma para pasta `controller` listando todos os objetos cadastrados:

```javascript
exports.getAll = async (req,res) => {
    await Drama.find({}).then((dramas) => {
        res.status(200).json(dramas);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum Livro na categoria DRAMA foi encontrado"});
        console.error(err);
    });
}

```



E, ainda, com a opção de listar um objeto específico pelo `Id`, onde utilizamos o Id gerado pelo Mongo Atlas como parâmetro. Contudo, se por ventura o mesmo não existir, retorna uma mensagem de erro utilizando o padrão de **Códigos de Status de Respostas HTTP**, por isso as rotas são assíncronas, devendo o servidor aguardar o retorno da informação do Mongo Atlas para prosseguir ou não com o estipulado pelo código, sendo o erro repassado pelo `JSON`:

```javascript
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

```



Já para a o método `POST`é de extrema importância as validações utilizando cada informação requisitada pelo banco, sendo esta, também uma função assíncrona. Se por algum motivo alguma informação não for repassada pelo usuário o código informa o erro padrão `JSON`e não permite a continuação da inclusão do dado através do `return` inserido em cada validação,  conforme abaixo:

```javascript
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

```



Conforme mencionado anteriormente, também utilizamos a mesma validação para o método `PUT`, visando evitar a atualização de um objeto indesejado. Essa atualização pode ocorrer tanto buscando pelo nome do objeto cadastrado, como pelo autor, pela editora, pelo número de páginas , pelo ano de lançamento ou pela imagem da URL inserida no Mongo Atlas:

```javascript
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

```

No método `DELETE` a busca e validação ocorre pelo Id, tornando mais segura a exclusão do objeto no Mongo Atlas:

```javascript
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
```

Projeto "startado" pelo comando `node index`, definido no package.json.

Arquivo .env criado e adicionado ao gitgnore para segurança dos dados do programa.

Licença GNU - General Public License v3.0.



**Projeto Final - Módulo 3 - Blue Edtech**