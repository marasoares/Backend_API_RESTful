### API RESTful - Integração Backend e Frontend, utilizando NodeJS + Express + MongoDB + Deploy no Heroku

API criada para organização de `Livros` por categoria, sendo utilizadas, como exemplo, as categorias: 

1. Drama;
2. Ficção Científica;
3. Infantil;
4. Jurídico e
5. Policial.

#### Rotas e Endpoints

------

###### Drama:

- `GET/dramas/listAll` 

  Utilizada para listar todos os objetos inseridos no MongoDB, retorna status code 200 quando a rota está conectada ao banco corretamente:

- `GET/dramas/listId`

  Utilizada para listar o objeto relacionado ao Id informado pelo usuário. Caso o Id informado não seja localizado pelo servidor teremos um status code 404 - Page Not Found. 

- `POST/dramas/add`

  Utilizada para adicionar um novo objeto no MongoDB, devendo seguir o padrão de  dados abaixo, como exemplo, onde realizamos a validação de cada informação inserida pelo usuário. Em caso de erro, retorna status code 400.

```javascript
{
    "nome": "P.S Eu te amo",
    "autor": "Cecelia Ahern ",
    "editora": "Novo Conceito",
    "paginas": 368,
    "anoLancamento": 2012,
    "imagemUrl": "https://m.media-amazon.com/images/P/B00A3D0CDO.01._SCLZZZZZZZ_SX500_.jpg"
}
```

- `PUT/dramas/update/:id`

  Utilizada para atualizar um dado, sua busca é através do Id, onde também fazemos a validação de cada dado inserido, para que o banco seja formado conforme demonstração abaixo:

  ```javascript
  {
  	"_id": "6196ed29cb85e74c830b76b1",
      "nome": "P.S Eu te amo",
      "autor": "Cecelia Ahern ",
      "editora": "Novo Conceito",
      "paginas": 368,
      "anoLancamento": 2012,
      "imagemUrl": "https://m.media-amazon.com/images/P/B00A3D0CDO.01._SCLZZZZZZZ_SX500_.jpg"
  }
  ```

   

- `DELETE/dramas/delete/:id`

  A subrota delete também utiliza como parâmetro de busca o Id, evitando, assim, que seja excluído um dado diferente do requisitado.

  

##### Subrotas e endpoints:

------

Para cada categoria de livros, utilizamos o mesmo modelo de dados a serem inseridos pelo usuário, dessa forma temos as subrotas abaixo:

###### Ficção Científica:

- `GET/ficcao/listAll`
- `GET/ficcao/listId`
- `POST/ficcao/add`
- `PUT/ficcao/update/:id`
- `DELETE/ficcao/delete/:id`

###### Infantis:

- `GET/infantis/listAll`
- `GET/infantis/listId`
- `POST/infantis/add`
- `PUT/infantis/update/:id`
- `DELETE/infantis/delete/:id`

###### Juridicos:

- `GET/juridicos/listAll`
- `GET/juridicos/listId`
- `POST/juridicos/add`
- `PUT/juridicos/update/:id`
- `DELETE/juridicos/delete/:id`

###### Policiais:

- `GET/policiais/listAll`
- `GET/policiais/listId`
- `POST/policiais/add`
- `PUT/policiais/update/:id`
- `DELETE/policiais/delete/:id`



**Projeto Final - Módulo 3 - Blue Edtech**

