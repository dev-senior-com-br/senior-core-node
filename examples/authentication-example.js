require('dotenv').config({
    path: "../.env"
});

var SeniorApi = require('../built/index').default;
const parseString = require('xml2js').parseString;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;
var tenantName = process.env.TENANT_NAME;

var api = new SeniorApi(username, password);

function printError(error) {
	console.error(error);
}

// Efetuando login
api.authentication.login().then(function (json) {
	var jsonToken = JSON.parse(json.body.jsonToken);
	api.accessToken = jsonToken.access_token;
	
	var refreshToken = jsonToken.refresh_token;

	if (refreshToken) {
		// Efetuando refreshToken
		jsonToken = api.authentication.refreshToken(tenantName, refreshToken).then(function (json) {
			if (json.statusCode != 200) {
				parseString(json.body, function (err, result) {
					printError(result);
					return result;
				});
			} else {
				return JSON.parse(json.body.jsonToken);
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

var temporaryToken = "<SEU_TOKEN>";
var validationCode = "<SEU_CODIGO>";

// Efetuando loginMFA
var jsonToken = api.authentication.loginMFA(temporaryToken, validationCode).then(function (json) {
	if (json.statusCode != 200) {
		parseString(json.body, function (err, result) {
			printError(result);
			return result;
		});
	} else {
		return JSON.parse(json.body.jsonToken);
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar loginMFA: ", error);
});

var accessKey = "<SUA_CHAVE>";
var secret = "<SUA_SENHA>";

// Efetuando loginWithKey
jsonToken = api.authentication.loginWithKey(accessKey, secret, tenantName).then(function (json) {
	if (json.statusCode != 200) {
		parseString(json.body, function (err, result) {
			printError(result);
			return result;
		});
	} else {
		return JSON.parse(json.body.jsonToken);
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar loginWithKey: ", error);
});