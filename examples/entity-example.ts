// to run this you need to call ts-node entidade-example.ts

require('dotenv').config();
import { SeniorApi, FilterBuilder, Entity } from "../dist";
import { Grupo } from "./model/grupo";

const username = process.env.SENIOR_USERNAME;
const password = process.env.PASS;

const api = new SeniorApi();

// Efetuando login
api.authentication.login(username, password).then(function (json) {
  if(json.body.resetPasswordInfo) {
    throw new Error('Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.');
  }
  const jsonToken = JSON.parse(json.body.jsonToken);
  api.accessToken = jsonToken.access_token;
   
  const entity: Entity<Grupo> = api.getEntity('usuarios', 'userManager', 'Grupo');
  const group: Grupo = {nome: 'grupotestesdk'};
  entity.post(group).then(async post => {
    const persistedGroup = post.body;
    const id = persistedGroup.idGrupo.replace(/^\s+|\s+$/g,'');
    await entity.get()
      .then(sucess => console.log(sucess.body))
      .catch(err => console.error(err));
    await entity.get({ id })
      .then(sucess => console.log(sucess.body))
      .catch(err => console.error(err));
    await entity.get({filter: new FilterBuilder().field('nome').equals('grupotestesdk').build()})
      .then(sucess => console.log(sucess.body))
      .catch(err => console.error(err));
    const newGroup: Grupo = {
      nome: 'grupotestesdk2',
      idGrupo: persistedGroup.idGrupo
    }
    await entity.put(id, newGroup).then(sucess => console.log(sucess.body)) // returns {idGrupo}
      .catch(err => console.error(err));

    await entity.delete(id)
      .then(sucess => console.log(sucess.body)) // returns 204 no content
      .catch(err => console.error(err));
  }).catch(err => console.error(err))
    .finally(async () => {
     if (api.accessToken) {
      await api.authentication.logout().catch(function (error) {
        console.error('Erro na tentativa de efetuar logout: ', error);
      });
    }
  });

}).catch(function (error) {
  console.error('Erro na tentativa de efetuar login: ', error);
});