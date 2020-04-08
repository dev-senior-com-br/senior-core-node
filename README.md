# Senior API SDK para Node.js

Esta biblioteca permite desenvolvedores criar integrações com API da Senior. Você pode ler a documentação completa [aqui](https://dev.senior.com.br/api/platform/)
 
## Versão suportada do Node.js

A SDK suporta o Node.js na versão 10 ou superior.
 
## Instalação
```
npm i @seniorsistemas/senior-core --save-dev
```

## Ambiente
Atualmente o ambiente padrão para o desenvolvimento é o da Homologx.

## Fontes
```sh
$ git clone https://github.com/dev-senior-com-br/senior-core-node.git
$ cd senior-core-node
$ npm install
```

### Configurações
Os comando abaixo permitem configuração de proxy:
 - npm config set proxy <ALTERAR_PARA_PROXY_HTTP>
 - npm config set https-proxy <ALTERAR_PARA_PROXY_HTTPS>

_Criar arquivo *.env* na raíz do projeto_

#### _Adicionar ao arquivo as seguintes propriedades_ 
```text
 SENIOR_USERNAME = <NOME_DO_USUARIO>
 PASS = <SENHA_DO_USUARIO>
 TENANT_NAME = <NOME_DO_TENANT>
```

### Iniciando a utilização

Primeiro você precisa criar um arquivo `.js`, como por exemplo: `authentication-example.js`, e nele requerer a biblioteca.

```javascript
var SeniorApi = require('../senior-core-node/index').default;
```

Então você precisa criar instância informando usuário e senha.

```javascript
var api = new SeniorApi(username, password);
```

### Exemplos
Na pasta [examples](https://github.com/dev-senior-com-br/senior-core-node/tree/develop/examples) você encontrar alguns exemplos.
Para executa-los, entrar na pasta example, executar a instalação das dependencias:
```
npm install
```

Alterear os valores das variáveis e executar conforme o comando abaixo:
```
node <teste>-example
``` 

### Links
* [Documentação da API](https://dev.senior.com.br/api/platform/)


## Obtendo versão de distribuição
Última versão disponível em [https://www.npmjs.com/package/@seniorsistemas/senior-core](https://www.npmjs.com/package/@seniorsistemas/senior-core)

## Suporte

Criar uma issue [https://github.com/dev-senior-com-br/senior-core-node/issues](https://github.com/dev-senior-com-br/senior-core-node/issues)

### License

Copyright © 2020.
