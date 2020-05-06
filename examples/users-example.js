require('dotenv').config({
	path: "../.env"
});

var SeniorApi = require('../built/index').default;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

//Propriedades necessárias:
var creation_username = "<Username do novo usuário>";
var creation_fullName = "<Nome completo>";
var creation_email = "<Email do novo usuário>";
var creation_password = "<Senha do novo usuário>";
var creation_locale = "<Locale do usuário (exemplo: pt-BR)>";
var changed_fullName = "<Nome completo para alteração do usuário>";
var tenantName = "<Nome do tenant>";
var group_name =  "<Nome do novo grupo>";
var group_description = "<Descrição do grupo>";


var api = new SeniorApi();

api.authentication.login(username, password).then(function (json) {
	var jsonToken = JSON.parse(json.body.jsonToken);
	api.accessToken = jsonToken.access_token;

	var blocked = false;
	var changePassword = false;
	var photo;
	var userDescription = "teste de API com NodeJS";
	var properties;

	api.users.createUser(creation_username, creation_fullName, creation_email, creation_password, userDescription, blocked, changePassword, photo, creation_locale, properties).then(function (json) {
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
				console.error("Erro na tentativa de realizar chamada de getUser. ", error);
			});

			api.users.updateUser(creation_username, changed_fullName, creation_email, creation_password, userDescription, blocked, changePassword, photo, creation_locale, properties).then(function (json) {
					if (json.statusCode != 200) {
					console.log(json);
				} else {
					console.log(json.body);
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de updateUser. ", error);
			});
			var users = [creation_username];
			var id = "";
			api.users.createGroup(group_name, group_description, creation_email, users).then(function (json) {
		
				if (json.statusCode != 200) {
					console.log(json);
				} else {
		
					console.log(json.body);
					id = json.body.id;
		
					var usersToAdd = [];
					var usersToRemove = [creation_username];
					api.users.updateGroup(id, group_name, group_description, creation_email, usersToAdd, usersToRemove).then(function (json) {
						if (json.statusCode != 200) {
							console.log(json);
						} else {
							console.log(json.body);
						}
					}).catch(function (error) {
						console.error("Erro na tentativa de realizar chamada de updateGroup. ", error);
					});
		
					usersToAdd = [creation_username];
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
		
					var pagination;
					api.users.listGroupUsers(id, group_name, pagination).then(function (json) {
						if (json.statusCode != 200) {
							console.log(json);
						} else {
							console.log(json.body);
						}
					}).catch(function (error) {
						console.error("Erro na tentativa de realizar chamada de listGroupUsers. ", error);
					});
		
					api.users.listGroups(group_name, tenantName, pagination).then(function (json) {
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
		
				}
		
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de createGroup. ", error);
			});

			api.users.getUser(creation_username).then(function (json) {
				if (json.statusCode != 200) {
					console.log(json);			
				} else {
					console.log(json.body);
					idUser = json.body.id;
					api.users.deleteUser(idUser).then(function (json) {
						if (json.statusCode != 200) {
							console.log(json);
						} else {
							console.log(json.body);
						}
					}).catch(function (error) {
						console.error("Erro na tentativa de realizar chamada de deleteUsuario. ", error);
					});

					if (api.accessToken) {
						api.authentication.logout().catch(function (error) {
							console.error("Erro na tentativa de efetuar logout: ", error);
						});
					}
				}
			}).catch(function (error) {
				console.error("Erro na tentativa de realizar chamada de getUser. ", error);
			});
		}
	}).catch(function (error) {
		console.error("Erro na tentativa de realizar chamada de createUser. ", error);
	});
}).catch(function (error) {
	console.error("Erro na tentativa de efetuar login: ", error);
});