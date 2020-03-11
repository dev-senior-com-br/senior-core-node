"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestOptions = /** @class */ (function () {
    function RequestOptions(timeout, url, method, headers, json, qs, useQuerystring) {
        if (timeout === void 0) { timeout = 30000; }
        if (url === void 0) { url = null; }
        if (method === void 0) { method = null; }
        if (headers === void 0) { headers = null; }
        if (json === void 0) { json = null; }
        if (qs === void 0) { qs = null; }
        if (useQuerystring === void 0) { useQuerystring = false; }
        this.timeout = timeout;
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.json = json;
        this.qs = qs;
        this.useQuerystring = useQuerystring;
    }
    RequestOptions.prototype.toTOptions = function () {
        return {
            timeout: this.timeout,
            url: this.url,
            method: this.method,
            headers: this.headers,
            json: this.json,
            qs: this.qs,
            useQuerystring: this.useQuerystring,
        };
    };
    return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
