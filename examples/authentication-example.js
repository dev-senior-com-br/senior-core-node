 require('dotenv').config({
     path: "../.env"
});

var SeniorApi = require('../dist/index').SeniorApi;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;
var tenantName = process.env.TENANT_NAME;

//Propriedades necessárias:
var temporaryToken = "<SEU_TOKEN>";
var validationCode = "<SEU_CODIGO>";
var accessKey = "<SUA_CHAVE>";
var secret = "<SUA_SENHA>";

var api = new SeniorApi();
api.environment = "DEV";

// Efetuando login
api.authentication.login(username, password).then(function (json) {
	if(json.body.resetPasswordInfo) {
		throw new Error("Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.");
	}
	var jsonToken = JSON.parse(json.body.jsonToken);
	api.accessToken = jsonToken.access_token;
	
	var refreshToken = jsonToken.refresh_token;

	if (refreshToken) {
		// Efetuando refreshToken
		jsonToken = api.authentication.refreshToken(tenantName, refreshToken).then(function (json) {
			if (json.statusCode != 200) {
				console.error(json.body);
			} else {
				console.log(JSON.parse(json.body.jsonToken));
			}
		}).catch(function (error) {
			console.error("Erro na tentativa de efetuar refreshToken: ", error);
		});
	}

	if (api.accessToken) {
		// Efetuando logout
		api.authentication.logout().catch(function (error) {
			console.error("Erro na tentativa de efetuar logout: ", error);
		});
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar login: ", error);
});


// Efetuando loginMFA
api.authentication.loginMFA(temporaryToken, validationCode).then(function (json) {
	if (json.statusCode != 200) {
		console.error(json.body);
	} else {
		console.log(json.body.jsonToken);
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar loginMFA: ", error);
});

// Efetuando loginWithKey
api.authentication.loginWithKey(accessKey, secret, tenantName).then(function (json) {
	if (json.statusCode != 200) {
		console.error(json.body);
	} else {
		console.log(JSON.parse(json.body.jsonToken));
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar loginWithKey: ", error);
});