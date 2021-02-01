require('dotenv').config();
var SeniorApi = require('../').SeniorApi;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi();

const createPayload = {
  propertyKey: 'MinhaPropCustomizada',
  type: 'String',
  propertyValue: 'Meu teste',
  label: 'Minha propriedade Customizada',
  propertyLevel: 'SYSTEM'
}

const propKeyPayload = {
  propertyKey: 'MinhaPropCustomizada'
}

const updatePayload = {
  propertyKey: 'MinhaPropCustomizada',
  type: 'String',
  propertyValue: 'Meu teste - Alterado',
  label: 'Minha propriedade Customizada - Alterada',
  propertyLevel: 'SYSTEM'
}

api.authentication.login({username, password}).then(function (json) {
  if(json.body.resetPasswordInfo) {
    throw new Error('Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.');
  }
  
  api.accessToken = JSON.parse(json.body.jsonToken).access_token;
  api.configuration.createCustomProperty(createPayload)
  .then(function (json) {
    if (json.statusCode != 200) {
      console.error(json);
    } else {
      console.log(json.body);
    }
      
    api.configuration.getCustomProperty(propKeyPayload)
    .then(function (json) {
      if (json.statusCode != 200) {
        console.error(json);
      } else {
        console.log(json.body);
      }
        
      api.configuration.updateCustomProperty(updatePayload)
      .then(function (json) {
        if (json.statusCode != 200) {
          console.error(json);
        } else {
          console.log(json.body);
        }

        api.configuration.getCustomProperty(propKeyPayload)
        .then(function (json) {
          if (json.statusCode != 200) {
            console.error(json);
          } else {
            console.log(json.body);
          }

          api.configuration.deleteCustomProperty(propKeyPayload)
          .then(function (json) {
            if (json.statusCode != 200) {
              console.error(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de excluir propriedade de configuração: ', error);
          });  
        }).catch(function (error) {
          console.error('Erro na tentativa de ler propriedade de configuração: ', error);
        });  
      }).catch(function (error) {
        console.error('Erro na tentativa de atualizar propriedade de configuração: ', error);
      });  
    }).catch(function (error) {
      console.error('Erro na tentativa de ler propriedade de configuração: ', error);
    });      
  }).catch(function (error) {
    console.error('Erro na tentativa de criar propriedade de configuração: ', error);
  });


  if (api.accessToken) {
    api.authentication.logout().catch(function (error) {
      console.error('Erro na tentativa de efetuar logout: ', error);
    });
  }
}).catch(function (error) {
  console.error('Erro na tentativa de efetuar login: ', error);
});

