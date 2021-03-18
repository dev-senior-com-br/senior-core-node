require('dotenv').config();

var SeniorApi = require('../').SeniorApi;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var resource = process.env.RESOURCE_URI;
var resourceName = process.env.RESOURCE_NAME;
var action = process.env.RESOURCE_ACTION;
var attributes = [{ 'attribute': process.env.ATTRIBUTE_NAME, 'value': process.env.ATTRIBUTE_VALUE }];
var role = process.env.ROLE_NAME;
var descriptionRole = process.env.ROLE_DESCRIPTION;
var roles = [role];
var users = [process.env.USER_ID];

var api = new SeniorApi();

function printError(error) {
  console.error(error['ams:fault']['ams:code'][0] + ' - ' + error['ams:fault']['ams:message'][0] + ' - ' + error['ams:fault']['ams:description'][0]);
}

var api = new SeniorApi();
api.environment = 'DEV';

// Efetuando login
api.authentication.login({username, password}).then(function (json) {
  if(json.body.resetPasswordInfo) {
    throw new Error('Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.');
  }
  var jsonToken = JSON.parse(json.body.jsonToken);
  api.accessToken = jsonToken.access_token;

  var uri = 'res://senior.com.br/bi/custom_form/entities/customForm';
  api.authorization.getResource(uri).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa obter o recurso: ', error);
  });

  api.authorization.checkAccess({resource, action, attributes}).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro ao verificar se o usuário corrente possui permissão: ', error);
  });

  const resourcesToSave = [{
    uri: resource,
    name: resourceName,
    actions: [{
      name: action
    }]
  }]
  api.authorization.saveResources(resourcesToSave).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa criar o recurso: ', error);
  });

  var resource2Delete = resourcesToSave.map(r2s => r2s.uri);

  api.authorization.deleteResources(resource2Delete).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de excluir o recurso: ', error);
  });

  api.authorization.createRole({name: role, description: descriptionRole}).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de criar o papel: ', error);
  });

  api.authorization.getRole(role).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de obter o papel: ', error);
  });

  api.authorization.listRoles(role).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de obter o papeis: ', error);
  });

  api.authorization.deleteRole(role).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de remover o papel: ', error);
  });

  api.authorization.assignUsers({roles, users}).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de associar usuário(s) ao(s) papel(is): ', error);
  });

  api.authorization.unassignUsers({roles, users}).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de desassociar usuário(s) ao(s) papel(is): ', error);
  });

  api.authorization.getRoleFilters({roles: ['roleName','roleName'], domainName: 'domainName', serviceName: 'serviceName'}).then(function (json) {
    if (json.statusCode != 200) {
      console.error(json.body);
    } else {
      console.log(JSON.stringify(json.body));
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de obter os filtros dos papéis: ', error);
  });

  if (api.accessToken) {
    api.authentication.logout().catch(function (error) {
      console.error('Erro na tentativa de efetuar logout: ', error);
    });
  }
}).catch(function (error) {
  console.error('Erro na tentativa de efetuar login: ', error);
});

