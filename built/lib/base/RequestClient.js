"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientOptions_1 = require("../model/ClientOptions");
var RequestOptions_1 = require("../model/RequestOptions");
var Domain_1 = require("./Domain");
var _ = require("lodash");
var Q = require("q");
var http = require("request");
var RequestClient = /** @class */ (function () {
    function RequestClient(seniorApi) {
        var _this = this;
        /**
         * @param {ClientOptions}
         *            opts
         */
        this.request = function (opts) {
            if (opts === void 0) { opts = new ClientOptions_1.ClientOptions(); }
            if (!opts.method) {
                throw new Error('O "method" deve ser informado');
            }
            if (!opts.url) {
                throw new Error('A "url" deve ser informada');
            }
            var deferred = Q.defer();
            var headers = new Map();
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            if (opts.headers) {
                headers = _.merge(headers, opts.headers);
            }
            if (opts.accessToken) {
                headers.set('Authorization', "Bearer " + opts.accessToken);
            }
            // opções de request
            var options = new RequestOptions_1.RequestOptions(opts.timeout, _this.baseUrl + opts.url, opts.method, headers);
            if (!_.isNull(opts.data)) {
                options.json = opts.data;
            }
            if (!_.isNull(opts.params)) {
                options.qs = opts.params;
                options.useQuerystring = true;
            }
            http(options.url, options.toTOptions(), function (error, response) {
                if (error) {
                    deferred.reject(error);
                }
                else {
                    deferred.resolve({
                        statusCode: response.statusCode,
                        body: response.body,
                    });
                }
            });
            return deferred.promise;
        };
        this.seniorApi = seniorApi;
        this.baseUrl = new Domain_1.default(this.seniorApi).baseUrl;
    }
    return RequestClient;
}());
exports.default = RequestClient;
