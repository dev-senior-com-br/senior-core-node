require('dotenv').config({
  path: '../.env'
});
var SeniorApi = require('../').SeniorApi;
var FilterBuilder = require('../').FilterBuilder;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi();

// Efetuando login
api.authentication.login(username, password).then(function (json) {
  if(json.body.resetPasswordInfo) {
    throw new Error('Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.');
  }
  var jsonToken = JSON.parse(json.body.jsonToken);
  api.accessToken = jsonToken.access_token;
   
  var entity = api.getEntity('usuarios', 'userManager', 'Grupo');
    
  entity.post({
    nome: 'grupotestesdk'
  }).then(post => {
    const id = post.body.idGrupo.replace(/^\s+|\s+$/g,'');
    entity.get().then(sucess => {console.log(sucess);}, error => {console.log(error);});
    entity.get(id).then(sucess => {console.log(sucess);}, error => {console.log(error);});
    entity.get(new FilterBuilder().field('nome').equals('grupotestesdk').build()).then(sucess => {console.log(sucess);}, error => {});
        
    entity.put(id, {
      idGrupo: id,
      nome: 'grupotestesdk2'
    }).then(sucess => {console.log(sucess);}, error => {console.log(error);});

    entity.patch(id, {
      idGrupo: id,
      nome: 'grupotestesdk3'
    }).then(sucess => {console.log(sucess);}, error => {console.log(error);});

    entity.delete(id).then(sucess => {console.log(sucess);}, error => {console.log(error);});
  }, error => {console.log(error);});

  if (api.accessToken) {
    api.authentication.logout().catch(function (error) {
      console.error('Erro na tentativa de efetuar logout: ', error);
    });
  }
}).catch(function (error) {
  console.error('Erro na tentativa de efetuar login: ', error);
});