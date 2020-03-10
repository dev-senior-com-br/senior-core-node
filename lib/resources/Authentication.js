'use strict';

var RequestClient = require('../base/RequestClient');
var Domain = require('../base/Domain');

function Authentication(seniorApi) {
	Domain.prototype.constructor.call(this, seniorApi);
}

Object.defineProperty(Authentication.prototype, 'client', {
	get : function() {
		this._client = this._client || new RequestClient(this.seniorApi);
		return this._client;
	}
});

Authentication.prototype.login = function() {
	return this.client.request({
		url : '/rest/platform/authentication/actions/login',
		method : 'POST',
		data : {
			'username' : this.seniorApi.username,
			'password' : this.seniorApi.password
		}
	});
};

Authentication.prototype.logout = function() {
	return this.client.request({
		url : '/rest/platform/authentication/actions/logout',
		method : 'POST',
		accessToken : this.seniorApi.accessToken,
		data : {
			'access_token' : this.seniorApi.accessToken
		}
	});
};

Authentication.prototype.loginMFA = function(temporaryToken, validationCode) {
	return this.client.request({
		url : '/rest/platform/authentication/actions/loginMFA',
		method : 'POST',
		data: {
			'temporaryToken': temporaryToken,
			'validationCode': validationCode
		}
	});
};

Authentication.prototype.loginWithKey = function(accessKey, secret, tenantName) {
	return this.client.request({
		url : '/anonymous/rest/platform/authentication/actions/loginWithKey',
		method : 'POST',
		data: {
			'accessKey': accessKey,
			'secret': secret,
			'tenantName': tenantName
		}
	});
};

Authentication.prototype.refreshToken = function(tenantName, refreshToken) {
	return this.client.request({
		url : '/rest/platform/authentication/actions/refreshToken',
		method : 'POST',
		headers: {
			'X-Tenant': tenantName
		},
		data: {
			'refreshToken': refreshToken
		}
	});
};

module.exports = Authentication;