# Desafio - Criação de API - Nodejs e MySQL

Essa API é capaz de cadastrar um usuário, fazer login e autenticação, criar, atualizar e deletar produtos.


## Executar o projeto

Projeto Clonar git clone `https://github.com/BrunoFelixB/api-usuarios.git`

Requisitos de instalação `npm install`

Dependências: `cors, dontenv-safe, express, mysql2, nodemon, jsonwebtoken, bcrypt`

Arquitetura: `o projeto foi feito ultilizando a arquitetura MVC`

### Configure o servidor:

Com o MySQL devidamente instalado em sua máquina,

utilize o programa MySQL Workbech - uma ferramenta visual unificada para arquitetos de banco de dados.

Crie o banco de dados nomeado de `database` e para o Armazenamento crei as Tabelas: 

##### criando as tabelas

```

Tabela: usuarios

deve criar as colunas: 

idusers
name
email
password

```


```

Tabela: produtos

deve criar as colunas: 

idprodutos
name
descr
price

```

# Primeiro - rodar o comando para iniciar o servidor:

```
npm run dev

```
O comando irá ligar o servidor e o mesmo funcionará através da porta 8080.

# Segundo, acessando as Rotas:

## Criar Usuário

#### Requeste 

ultileze o método `POST` para a Rota:

```
http://localhost:8080/create

```

devem ser passados pelo body em JSON os seguintes comandos: 

```

{
    "nome": "string",
    "email": "string",
    "password": "string"
}

```

Isso irá armazenar o usuário no banco de dados dentro da tabela usuários.

#### Response 

Você receberá um mensagem informando que usuario cadastrado com sucesso.


## Fazer login

#### Requeste 

ultilize o método `POST` para a Rota:

```
http://localhost:8080/login

```

devem ser passados pelo body em JSON os seguintes comandos: 

{
    "email": "string",
    "password": "string"
}

#### Response 

Você receberá um mensagem informando que o login foi realizado com sucesso e um `TOKEN` necessário para autenticação do usuário.


## Criar produto

#### Requeste 

ultilize o método `POST` para a Rota:

```
http://localhost:8080/produtos/criar

```

Antes de passar as informações é necessário definir a autorização com o TOKEN guardado, sem esse processo não é permitido acessar esta rota ou criar produtos. 

defina os seguins parametros: "key":"Authorization","value":"Bearer TOKEN passado no momento do login"

Após feito isso, devem ser passados pelo body em JSON os seguintes comandos: 

{
    "name": "string",
    "descr": "string",
    "price": "string"
}

#### Response 

Você receberá um mensagem informando que o produto foi cadastrado com sucesso.



## consultar produtos

#### Requeste 

ultilize o método `GET` para a Rota:

Antes de passar as informações é necessário definir a autorização com o TOKEN guardado, sem esse processo não é permitido acessar esta rota ou consultar produtos. 

defina os seguins parametros: "key":"Authorization","value":"Bearer TOKEN passado no momento do login"

```
http://localhost:8080/produtos/all

```


#### Response 

Você receberá todos os produtos cadastrados no banco de dados.


## editar produto

#### Requeste 

ultilize o método `PATCH` para a Rota:

```
http://localhost:8080/produtos/editar

```

Antes de passar as informações é necessário definir a autorização com o TOKEN guardado, sem esse processo não é permitido acessar esta rota ou editar produtos. 

defina os seguins parametros: "key":"Authorization","value":"Bearer TOKEN passado no momento do login"

Após feito isso, devem ser passados pelo body em JSON os seguintes comandos: 

{
  "id":"string",
  "name":"string",
  "descr":"string",
  "price":"string"
}


#### Response 

Você receberá um mensagem informando que o produto foi editado com sucesso.


## deletar produto

#### Requeste 

Antes de passar as informações é necessário definir a autorização com o TOKEN guardado, sem esse processo não é permitido acessar esta rota ou criar produtos. 

defina os seguins parametros: "key":"Authorization","value":"Bearer TOKEN passado no momento do login"

Após feito isso, acessa rota e informe o ID por parametro:

ultilize o método `DELETE` para a Rota:

```
o id do produto deve ser passado por parametro, exemplo:

http://localhost:8080/produtos/delete/1

```

#### Response 

Você receberá um mensagem informando que o produto foi deletado com sucesso.
