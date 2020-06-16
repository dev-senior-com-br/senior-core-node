require('dotenv').config({
    path: "../.env"
});

var SeniorApi = require('../built/index').default;
const parseString = require('xml2js').parseString;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi(username, password);

function printError(error) {
	console.error(error['ams:fault']['ams:code'][0] + " - " + error['ams:fault']['ams:message'][0] + " - " + error['ams:fault']['ams:description'][0]);
}

api.authentication.login(username, password).then(function (json) {
	if(json.body.resetPasswordInfo) {
		throw new Error("Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.");
	}
	var jsonToken = JSON.parse(json.body.jsonToken);
	api.accessToken = jsonToken.access_token;

	var tenantName = "<TENANT_NAME>";
	api.tenant.getTenantByName(tenantName).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return json.body.tenant;
		}
	}).catch(function (error) {
		console.error("Erro na tentativa obter o tenant pelo nome: ", error);
	});

	var tenantDomain = "<TENANT_DOMAIN>";

	api.tenant.getTenantByDomain(tenantDomain).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return json.body.tenant;
		}
	}).catch(function (error) {
		console.error("Erro na tentativa obter o tenant pelo dominio: ", error);
	});

	if (api.accessToken) {
		api.authentication.logout().catch(function (error) {
			console.error("Erro na tentativa de efetuar logout: ", error);
		});
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar login: ", error);
});

