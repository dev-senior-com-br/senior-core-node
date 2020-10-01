require('dotenv').config();

var SeniorApi = require('../').SeniorApi;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

//Propriedades necessárias:
var creation_username = process.env.NEW_USER_USERNAME;
var creation_fullName = process.env.NEW_USER_FULLNAME;
var creation_email = process.env.NEW_USER_EMAIL;
var creation_password = process.env.NEW_USER_PASS;
var creation_locale = process.env.NEW_USER_LOCALE || 'pt-br';
var changed_fullName = process.env.CHANGED_USER_FULLNAME;
var tenantName = process.env.TENANT_NAME;
var group_name =  process.env.GROUP_NAME;
var group_description = process.env.GROUP_DESCRIPTION;


var api = new SeniorApi();

api.authentication.login({username, password}).then(function (json) {
  if(json.body.resetPasswordInfo) {
    throw new Error('Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.');
  }
  var jsonToken = JSON.parse(json.body.jsonToken);
  api.accessToken = jsonToken.access_token;

  var blocked = false;
  var changePassword = false;
  var photo;
  var userDescription = 'teste de API com NodeJS';
  var properties;

  api.users.getUser(username).then(function (json) {
    if (json.statusCode != 200) {
      console.log(json);			
    } else {
      console.log('Minhas informações: ' + json.body);					
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de realizar chamada de getUser. ', error);
  });

  api.users.createUser({
    blocked, 
    changePassword, 
    photo, 
    properties,
    username: creation_username,
    fullName: creation_fullName,
    email: creation_email,
    password: creation_password,
    description: userDescription,
    locale: creation_locale
  }).then(function (json) {
    if (json.statusCode != 200) {
      console.log(json);
    } else {
      console.log(json.body);

      api.users.getUser(creation_username).then(function (json) {
        if (json.statusCode != 200) {
          console.log(json);			
        } else {
          console.log(json.body);					
        }
      }).catch(function (error) {
        console.error('Erro na tentativa de realizar chamada de getUser. ', error);
      });

      api.users.updateUser({
        username: creation_username,
        fullName: creation_fullName,
        email: creation_email,
        description: userDescription,
        locale: creation_locale,
        blocked, 
        changePassword, 
        photo, 
        properties
      }).then(function (json) {
        if (json.statusCode != 200) {
          console.log(json);
        } else {
          console.log(json.body);
        }
      }).catch(function (error) {
        console.error('Erro na tentativa de realizar chamada de updateUser. ', error);
      });
      var users = [creation_username];
      var id = '';
      api.users.createGroup({
        users,
        description: group_description,
        email: creation_email,
        name: group_name
      }).then(function (json) {
		
        if (json.statusCode != 200) {
          console.log(json);
        } else {
		
          console.log(json.body);
          id = json.body.id;
		
          var usersToAdd = [];
          var usersToRemove = [creation_username];
          api.users.updateGroup({
            id, 
            usersToAdd, 
            usersToRemove,
            description: group_description,
            email: creation_email,
            name: group_name
          }).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de updateGroup. ', error);
          });
		
          usersToAdd = [creation_username];
          usersToRemove = [];
          api.users.updateGroupUsers({usersToAdd, usersToRemove, groupId: id}).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de updateGroupUsers. ', error);
          });
		
          api.users.getGroup(id).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de getGroup. ', error);
          });
		
          var pagination;
          api.users.listGroupUsers({id, searchValue: group_name, pagination}).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de listGroupUsers. ', error);
          });
		
          api.users.listGroups({searchValue: group_name, tenant: tenantName, pagination}).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de listGroupUsers. ', error);
          });
		
          api.users.deleteGroup(id).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de deleteGroup. ', error);
          });
		
        }
		
      }).catch(function (error) {
        console.error('Erro na tentativa de realizar chamada de createGroup. ', error);
      });

      api.users.getUser(creation_username).then(function (json) {
        if (json.statusCode != 200) {
          console.log(json);			
        } else {
          console.log(json.body);
          api.users.deleteUser(creation_username).then(function (json) {
            if (json.statusCode != 200) {
              console.log(json);
            } else {
              console.log(json.body);
            }
          }).catch(function (error) {
            console.error('Erro na tentativa de realizar chamada de deleteUsuario. ', error);
          });

          if (api.accessToken) {
            api.authentication.logout().catch(function (error) {
              console.error('Erro na tentativa de efetuar logout: ', error);
            });
          }
        }
      }).catch(function (error) {
        console.error('Erro na tentativa de realizar chamada de getUser. ', error);
      });
    }
  }).catch(function (error) {
    console.error('Erro na tentativa de realizar chamada de createUser. ', error);
  });
}).catch(function (error) {
  console.error('Erro na tentativa de efetuar login: ', error);
});