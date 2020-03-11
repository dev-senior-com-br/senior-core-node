"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientOptions_1 = require("../model/ClientOptions");
var HttpMethod_1 = require("../model/HttpMethod");
var RequestClient_1 = require("../base/RequestClient");
var Authorization = /** @class */ (function () {
    function Authorization(seniorApi) {
        var _this = this;
        this.getResource = function (uri) {
            if (!uri) {
                throw new Error('A "uri" deve ser informada');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/queries/getResource", HttpMethod_1.HttpMethod.POST, {
                uri: uri
            });
            return _this.client.request(clientOptions);
        };
        this.checkAccess = function (resource, action, attributes) {
            if (!resource) {
                throw new Error('O "resource" deve ser informado');
            }
            if (!action) {
                throw new Error('A "action" deve ser informada');
            }
            if (!attributes) {
                throw new Error('Os "attributes" devem ser informados');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/checkAccess", HttpMethod_1.HttpMethod.POST, {
                permissions: [
                    {
                        resource: resource,
                        action: action,
                        attributes: attributes
                    }
                ],
                includeFilters: false,
                includeDelegations: false
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.saveResources = function (resources) {
            if (!resources) {
                throw new Error('Os "resources" devem ser informados');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/saveResources", HttpMethod_1.HttpMethod.POST, {
                resources: resources
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.deleteResources = function (resources) {
            if (!resources) {
                throw new Error('Os "resources" devem ser informados');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/deleteResources", HttpMethod_1.HttpMethod.POST, {
                resources: resources
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.createRole = function (name, description) {
            if (!name) {
                throw new Error('O "name" deve ser informado');
            }
            if (!description) {
                throw new Error('O "description" deve ser informado');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/createRole", HttpMethod_1.HttpMethod.POST, {
                name: name,
                description: description
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.getRole = function (name) {
            if (!name) {
                throw new Error('O "name" deve ser informado');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/queries/getRole", HttpMethod_1.HttpMethod.POST, {
                name: name
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.deleteRole = function (name) {
            if (!name) {
                throw new Error('O "name" deve ser informado');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/deleteRole", HttpMethod_1.HttpMethod.POST, {
                name: name
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.assignUsers = function (roles, users) {
            if (!roles) {
                throw new Error('Os "roles" devem ser informados');
            }
            if (!users) {
                throw new Error('Os "users" devem ser informados');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/assignUsers", HttpMethod_1.HttpMethod.POST, {
                roles: roles,
                users: users
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.unassignUsers = function (roles, users) {
            if (!roles) {
                throw new Error('Os "roles" devem ser informados');
            }
            if (!users) {
                throw new Error('Os "users" devem ser informados');
            }
            var clientOptions = new ClientOptions_1.ClientOptions("/rest/platform/authorization/actions/unassignUsers", HttpMethod_1.HttpMethod.POST, {
                roles: roles,
                users: users
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.seniorApi = seniorApi;
    }
    Object.defineProperty(Authorization.prototype, "client", {
        get: function () {
            this._client = this._client || new RequestClient_1.default(this.seniorApi);
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    return Authorization;
}());
exports.default = Authorization;
