'use strict';

var Authentication = require('./resources/Authentication');
var Authorization = require('./resources/Authorization');

function SeniorApi(username, password) {

	if (!username) {
		throw new Error('O "username" deve ser informado');
	}

	if (!password) {
		throw new Error('O "password" deve ser informado');
	}

	this.username = username;
	this.password = password;
	
	this.accessToken = undefined;
}

Object.defineProperty(SeniorApi.prototype, 'authentication', {
	get : function() {
		this._authentication = this._authentication || new Authentication(this); 
		return this._authentication;
	}
});

Object.defineProperty(SeniorApi.prototype, 'authorization', {
	get : function() {
		this._authorization = this._authorization || new Authorization(this); 
		return this._authorization;
	}
});

module.exports = SeniorApi;