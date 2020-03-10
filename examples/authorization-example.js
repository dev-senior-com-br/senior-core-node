require('dotenv').config({
    path: "../.env"
});

var SeniorApi = require('../index');
const parseString = require('xml2js').parseString;

var username = process.env.USERNAME;
var password = process.env.PASS;

var api = new SeniorApi(username, password);

function printError(error) {
	console.error(error['ams:fault']['ams:code'][0] + " - " + error['ams:fault']['ams:message'][0] + " - " + error['ams:fault']['ams:description'][0]);
}

api.authentication.login().then(function (json) {
	var jsonToken = JSON.parse(json.body.jsonToken);
	api.accessToken = jsonToken.access_token;

	var uri = "res://senior.com.br/bi/custom_form/entities/customForm";
	api.authorization.getResource(uri).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa obter o recurso: ", error);
	});

	var resource = "<URI_DO_RECURSO>";
	var action = "<ACAO_DO_RECURSO>";
	var attributes = [{ "attribute": "<NOME_DO_ATRIBUTO>", "value": "VALOR_DO_ATRIBUTO" }];

	api.authorization.checkAccess(resource, action, attributes).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro ao verificar se o usuário corrente possui permissão: ", error);
	});

	api.authorization.saveResources(uri).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa criar o recurso: ", error);
	});

	var resource2Delete = ["<IDENTIFICADOR_DO_RECURSO>"]

	api.authorization.deleteResources(resource2Delete).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de excluir o recurso: ", error);
	});

	var role = "<NOME_DO_PAPEL>";

	api.authorization.createRole(role).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de criar o papel: ", error);
	});

	api.authorization.getRole(role).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de obter o papel: ", error);
	});

	api.authorization.deleteRole(role).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de remover o papel: ", error);
	});

	var roles = ["<NOME_DO_PAPEL>"];
	var users = ["<IDENTIFICADOR_DO_USUARIO>"];

	api.authorization.assignUsers(roles, users).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de associar usuário(s) ao(s) papel(is): ", error);
	});

	api.authorization.unassignUsers(roles, users).then(function (json) {
		if (json.statusCode != 200) {
			parseString(json.body, function (err, result) {
				printError(result);
				return result;
			});
		} else {
			return JSON.parse(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de desassociar usuário(s) ao(s) papel(is): ", error);
	});

	if (api.accessToken) {
		api.authentication.logout().catch(function (error) {
			console.error("Erro na tentativa de efetuar logout: ", error);
		});
	}
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar login: ", error);
});

