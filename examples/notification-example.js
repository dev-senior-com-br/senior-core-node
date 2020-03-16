require('dotenv').config({
    path: "../.env"
});

var SeniorApi = require('../built/index').default;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi(username, password);

api.authentication.login().then(function (json) {
	api.accessToken = JSON.parse(json.body.jsonToken).access_token;

	api.notification.notifyUser(
        "authentication",
		"News",
		"None",
		"clica ni mim",
		"texto muito útil aqui",
		"platform",
		"authentication",
		["admin@workflow.com.br"]
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

