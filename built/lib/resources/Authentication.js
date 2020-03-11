"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestClient_1 = require("../base/RequestClient");
var ClientOptions_1 = require("../model/ClientOptions");
var HttpMethod_1 = require("../model/HttpMethod");
var Authentication = /** @class */ (function () {
    function Authentication(seniorApi) {
        var _this = this;
        this.login = function () {
            var clientOptions = new ClientOptions_1.ClientOptions('/rest/platform/authentication/actions/login', HttpMethod_1.HttpMethod.POST, {
                username: _this.seniorApi.username,
                password: _this.seniorApi.password,
            });
            return _this.client.request(clientOptions);
        };
        this.logout = function () {
            var clientOptions = new ClientOptions_1.ClientOptions('/rest/platform/authentication/actions/logout', HttpMethod_1.HttpMethod.POST, {
                access_token: _this.seniorApi.accessToken,
            });
            clientOptions.accessToken = _this.seniorApi.accessToken;
            return _this.client.request(clientOptions);
        };
        this.loginMFA = function (temporaryToken, validationCode) {
            var clientOptions = new ClientOptions_1.ClientOptions('/rest/platform/authentication/actions/loginMFA', HttpMethod_1.HttpMethod.POST, {
                temporaryToken: temporaryToken,
                validationCode: validationCode,
            });
            return _this.client.request(clientOptions);
        };
        this.loginWithKey = function (accessKey, secret, tenantName) {
            var clientOptions = new ClientOptions_1.ClientOptions('/anonymous/rest/platform/authentication/actions/loginWithKey', HttpMethod_1.HttpMethod.POST, {
                accessKey: accessKey,
                secret: secret,
                tenantName: tenantName,
            });
            return _this.client.request(clientOptions);
        };
        this.refreshToken = function (tenantName, refreshToken) {
            var clientOptions = new ClientOptions_1.ClientOptions('/rest/platform/authentication/actions/refreshToken', HttpMethod_1.HttpMethod.POST, {
                refreshToken: refreshToken,
            });
            clientOptions.headers = new Map();
            clientOptions.headers.set('X-Tenant', tenantName);
            return _this.client.request(clientOptions);
        };
        this.seniorApi = seniorApi;
    }
    Object.defineProperty(Authentication.prototype, "client", {
        get: function () {
            this._client = this._client || new RequestClient_1.default(this.seniorApi);
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    return Authentication;
}());
exports.default = Authentication;
