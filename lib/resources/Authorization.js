'use strict';

var RequestClient = require('../base/RequestClient');
var Domain = require('../base/Domain');

function Authorization(seniorApi) {
	Domain.prototype.constructor.call(this, seniorApi);
}

Object.defineProperty(Authorization.prototype, 'client', {
	get: function () {
		this._client = this._client || new RequestClient(this.seniorApi);
		return this._client;
	}
});

Authorization.prototype.getResource = function (uri) {
	if (!uri) {
		throw new Error('A "uri" deve ser informada');
	}

	return this.client.request({
		url: '/rest/platform/authorization/actions/getResource',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'uri': uri
		}
	});
};

Authorization.prototype.checkAccess = function (resource, action, attributes) {
	if (!resource) {
		throw new Error('O "resource" deve ser informado');
	}
	if (!action) {
		throw new Error('A "action" deve ser informada');
	}
	if (!attributes) {
		throw new Error('Os "attributes" devem ser informados');
	}
	return this.client.request({
		url: '/rest/platform/authorization/actions/checkAccess',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'permissions': [
				{
					'resource': resource,
					'action': action,
					'attributes': attributes
				}],
			'includeFilters': false,
			'includeDelegations': false
		}
	});
};

Authorization.prototype.saveResources = function (resources) {
	if (!resources) {
		throw new Error('Os "resources" devem ser informados');
	}
	return this.client.request({
		url: '/rest/platform/authorization/actions/saveResources',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'resources': resources
		}
	});
};

Authorization.prototype.deleteResources = function (resources) {
	if (!resources) {
		throw new Error('Os "resources" devem ser informados');
	}
	return this.client.request({
		url: '/rest/platform/authorization/actions/deleteResources',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'resources': resources
		}
	});
};

Authorization.prototype.createRole = function (name, description) {
	if (!name) {
		throw new Error('O "name" deve ser informado');
	}
	if (!description) {
		throw new Error('O "description" deve ser informado');
	}

	return this.client.request({
		url: '/rest/platform/authorization/actions/createRole',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'name': name,
			'description': description
		}
	});
};

Authorization.prototype.getRole = function (name) {
	if (!name) {
		throw new Error('O "name" deve ser informado');
	}

	return this.client.request({
		url: '/rest/platform/authorization/queries/getRole',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'name': name
		}
	});
};

Authorization.prototype.deleteRole = function (name) {
	if (!name) {
		throw new Error('O "name" deve ser informado');
	}

	return this.client.request({
		url: '/rest/platform/authorization/actions/deleteRole',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'name': name
		}
	});
};

Authorization.prototype.assignUsers = function (roles, users) {
	if (!roles) {
		throw new Error('Os "roles" devem ser informados');
	}
	if (!users) {
		throw new Error('Os "users" devem ser informados');
	}

	return this.client.request({
		url: '/rest/platform/authorization/actions/assignUsers',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'roles': roles,
			'users': users
		}
	});
};

Authorization.prototype.unassignUsers = function (roles, users) {
	if (!roles) {
		throw new Error('Os "roles" devem ser informados');
	}
	if (!users) {
		throw new Error('Os "users" devem ser informados');
	}

	return this.client.request({
		url: '/rest/platform/authorization/actions/unassignUsers',
		method: 'POST',
		accessToken: this.seniorApi.accessToken,
		data: {
			'roles': roles,
			'users': users
		}
	});
};

module.exports = Authorization;