"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authentication_1 = require("./resources/Authentication");
var Authorization_1 = require("./resources/Authorization");
var SeniorApi = /** @class */ (function () {
    function SeniorApi(username, password) {
        this.password = null;
        this.username = null;
        this.accessToken = null;
        if (!username) {
            throw new Error('O "username" deve ser informado');
        }
        if (!password) {
            throw new Error('O "password" deve ser informado');
        }
        this.username = username;
        this.password = password;
    }
    Object.defineProperty(SeniorApi.prototype, "authentication", {
        get: function () {
            this._authentication = this._authentication || new Authentication_1.default(this);
            return this._authentication;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SeniorApi.prototype, "authorization", {
        get: function () {
            this._authorization = this._authorization || new Authorization_1.default(this);
            return this._authorization;
        },
        enumerable: true,
        configurable: true
    });
    return SeniorApi;
}());
exports.default = SeniorApi;
// function SeniorApi(username: string, password: string) {
//   this.username = username;
//   this.password = password;
//   this.accessToken = undefined;
// }
// Object.defineProperty(SeniorApi.prototype, 'authentication', {
//   get: () => {
//     this._authentication = this._authentication || new Authentication(this);
//     return this._authentication;
//   },
// });
// Object.defineProperty(SeniorApi.prototype, 'authorization', {
//   get: () => {
//     this._authorization = this._authorization || new Authorization(this);
//     return this._authorization;
//   },
// });
