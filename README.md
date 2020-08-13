# Senior API SDK para Node.js

Esta biblioteca permite desenvolvedores criar integrações com API da Senior. Você pode ler a documentação completa [aqui](https://dev.senior.com.br/api/platform/)
 
## Versão suportada do Node.js

A SDK suporta o Node.js na versão 10 ou superior.
 
## Instalação
```
npm i @seniorsistemas/senior-core --save
```

## Ambiente
Atualmente o ambiente padrão para o desenvolvimento é o da Homologx.
Para fazer a troca do ambiente basta chamar o metodo `setEnvironment` ou `setUrl` caso queira passar uma url da plataforma diferente das configuradas:

```javascript
export enum ENVIRONMENTS {
  DEV = 'https://platform-homologx.senior.com.br/t/senior.com.br/bridge/1.0',
  PROD = 'https://api.senior.com.br',
}
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
const { SeniorApi } = require('@seniorsistemas/senior-core');
```

Então você precisa criar a instância do SeniorApi.

```javascript
const api = new SeniorApi(username, password);
```

Mudando o ambiente:

```javascript
const { ENVIRONMENTS } = require('@seniorsistemas/senior-core');
api.setEnvironment(ENVIRONMENTS.PROD);
```


### Exemplos
Na pasta [examples](https://github.com/dev-senior-com-br/senior-core-node/tree/develop/examples) você encontrar alguns exemplos.
Para executa-los, basta rodar o comando abaixo com o nome do arquivo (substituir a chave <nome_arquivo>).
```
node examples/<nome_arquivo>.js
``` 

Alguns exemplos necessitam de propriedades específicas, descritas no inicio dos arquivos. Para configurar basta criar um arquivo no root do projeto chamado `.env` contendo chave=valor para cada variavel de ambiente que o exemplo necessita.
Exemplo:
No arquivo `examples/authentication-example.js` usamos a variavel de ambiente: `process.env.SENIOR_USERNAME`, sendo assim no arquivo `.env` você vai colocar o seguinte:
```
SENIOR_USERNAME=<seu_usuario_da_plataforma>
PASS=<seu_password_da_plataforma>
```


Essa configuração é igual ao colocar variáveis de ambiente, o `.env` é só um falicitador para o node.
=======
#### Exemplos implementados

* [Authentication](examples/authentication-example.js)
* [Authorization](examples/authorization-example.js)
* [Entidade](examples/entidade-example.js)
* [Notification](examples/notification-example.js)
* [Tenant](examples/tenant-example.js)
* [Users](examples/users-example.js)



### Links
* [Documentação da API](https://dev.senior.com.br/api/platform/)


## Obtendo versão de distribuição
Última versão disponível em [https://www.npmjs.com/package/@seniorsistemas/senior-core](https://www.npmjs.com/package/@seniorsistemas/senior-core)

## Suporte

Criar uma issue [https://github.com/dev-senior-com-br/senior-core-node/issues](https://github.com/dev-senior-com-br/senior-core-node/issues)

### License

Copyright © 2020.
