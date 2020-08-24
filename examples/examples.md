## Documentaçao para os exemplos

Neste documento é definido os requisitos minimos para conseguir rodar os exemplos e como rodar eles.

### Definindo envs

Para definir as variáveis de ambiente definidos em alguns dos exemplos desse projeto, você precisa configurar de uma das seguintes formas:

Criando arquivo `.env` na raiz do projeto com o padrão abaixo

```
NOME_DA_VARIAVEL=VALOR_DA_VARIAVEL
PROXIMA_VARIAVEL=VALOR_PROXIMA_VARIAVEL
```

Adicionando envs pelo `bash` no terminal ou um arquivo `.sh`:

```bash
export NOME_DA_VARIAVEL="VALOR_DA_VARIAVEL"
export PROXIMA_VARIAVEL="VALOR_PROXIMA_VARIAVEL"
```

Adicionando envs pelo `cmd`:

```bat
SET NOME_DA_VARIAVEL=VALOR_DA_VARIAVEL
SET PROXIMA_VARIAVEL=VALOR_PROXIMA_VARIAVEL
```

Também é possivel alterar os valores pelo próprio arquivo `.js` ou `.ts`, conforme exemplo abaixo:

Nesse trecho de código o exemplo está pegando os valores da variavel de ambiente:

```js
var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;
var tenantName = process.env.TENANT_NAME;
```

No trecho abaixo foi alterado o exemplo para que seja passado diretamente os valores em vez de pegar da variável de ambiente:

```js
var username = 'username';
var password = 'pass';
var tenantName = 'tenant_name';
```

### Exemplos

Abaixo a listagem de exemplos que podem ser executados neste projeto. Em cada seção é informado o comando a ser executado a partir da pasta root do projeto e as variáveis de ambientes necessárias.

#### Authentication

```bash
node examples/authentication-example.js
```

```
SENIOR_USERNAME=
PASS=
TENANT_NAME=
TEMPORARY_TOKEN=
VALIDATION_TOKEN=
ACCESS_KEY=
SECRET=
```

#### Authorization

```bash
node examples/authorization-example.js
```

```
SENIOR_USERNAME=
PASS=
RESOURCE_URI=
RESOURCE_ACTION=
ATTRIBUTE_NAME=
ATTRIBUTE_VALUE=
ROLE_NAME=
ROLE_DESCRIPTION=
USER_ID=
```

#### Entity

```bash
npm run ts-node examples/entity-example.ts
```

```
SENIOR_USERNAME=
PASS=
```

#### Notification

```bash
node examples/notification-example.js
```

```
SENIOR_USERNAME=
PASS=
```

#### Tenant

```bash
node examples/tenant-example.js
```

```
SENIOR_USERNAME=
PASS=
```

#### User

```bash
node examples/users-example.js
```

```
SENIOR_USERNAME=
PASS=
NEW_USER_USERNAME=
NEW_USER_FULLNAME=
NEW_USER_EMAIL=
NEW_USER_PASS=
NEW_USER_LOCALE= //Default is pt-br
CHANGED_USER_FULLNAME=
TENANT_NAME=
GROUP_NAME=
GROUP_DESCRIPTION=
```
