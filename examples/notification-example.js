require('dotenv').config({
    path: "../.env"
});

var SeniorApi = require('../dist/index').SeniorApi;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi();

api.authentication.login(username, password).then(function (json) {
	if(json.body.resetPasswordInfo) {
		throw new Error("Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.");
	}
	api.accessToken = JSON.parse(json.body.jsonToken).access_token;

	api.notification.notifyUser(
        "authentication",
		"News",
		"None",
		"Assunto",
		"Conteúdo útil aqui",
		"platform",
		"authentication",
		[username]
    ).then(function (json) {
		if (json.statusCode != 200) {
			console.error(json);
		} else {
			console.log(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de enviar notificação: ", error);
	});

	if (api.accessToken) {
		api.authentication.logout().catch(function (error) {
			console.error("Erro na tentativa de efetuar logout: ", error);
		});
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar login: ", error);
});

