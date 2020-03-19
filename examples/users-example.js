require('dotenv').config({
	path: "../.env"
});

var SeniorApi = require('../built/index').default;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi(username, password);

api.authentication.login().then(function (json) {
	var jsonToken = JSON.parse(json.body.jsonToken);
	api.accessToken = jsonToken.access_token;

	var username = "teste-user";
	var fullName = "teste api NODEJS";
	var email = "teste@workflow.com.br";
	var password = "Teste12!";
	var description =  "teste de API com NodeJS";
	var blocked = false;
	var changePassword = false;
	var photo;
	var locale = "pt_BR";
	var properties;
	
	api.users.createUser(username, fullName, email, password, description, blocked, changePassword, photo, locale, properties).then(function (json) {
		if (json.statusCode != 200) {
			console.log(json);
		} else {
			console.log(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de realizar chamada de createUser. ", error);
	});

	api.users.getUser(username).then(function (json) {
		if (json.statusCode != 200) {
			console.log(json);
		} else {
			console.log(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de realizar chamada de getUser. ", error);
	});

	var tenantName = "<TENANT_NAME>";

	fullName = "teste api NODEJS alterado";
	api.users.updateUser(username, fullName, email, password, description, blocked, changePassword, photo, locale, properties).then(function (json) {
		if (json.statusCode != 200) {
			console.log(json);
		} else {
			console.log(json.body);
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de realizar chamada de updateUser. ", error);
	});

	var name = "grupoACME";
	var description = "Grupo de teste de NodeJS";
	var users = [username];
	var id = "";
	api.users.createGroup(name, description, email, users).then(function (json) {

		if (json.statusCode != 200) {
			console.log(json);
		} else {

			console.log(json.body);
			id = json.body.id;

			var usersToAdd = [];
			var usersToRemove = [username];
			api.users.updateGroup(id, name, description, email, usersToAdd, usersToRemove).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de updateGroup. ", error);
			});

			usersToAdd = [username];
			usersToRemove = [];
			api.users.updateGroupUsers(usersToAdd, usersToRemove, id).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de updateGroupUsers. ", error);
			});

			api.users.getGroup(id).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de getGroup. ", error);
			});

			var searchValue = "teste";
			var pagination;
			api.users.listGroupUsers(id, searchValue, pagination).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de listGroupUsers. ", error);
			});

			api.users.listGroups(searchValue, tenantName, pagination).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de listGroupUsers. ", error);
			});

			api.users.deleteGroup(id).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de deleteGroup. ", error);
			});

			if (api.accessToken) {
				api.authentication.logout().catch(function (error) {
					console.error("Erro na tentativa de efetuar logout: ", error);
				});
			}

		}

	}).catch(function (error) {
		console.error("Erro na tentativa de realizar chamada de createGroup. ", error);
	});

}).catch(function (error) {
	console.error("Erro na tentativa de efetuar login: ", error);
});

