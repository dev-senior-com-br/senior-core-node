"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientOptions = /** @class */ (function () {
    function ClientOptions(url, method, data) {
        if (url === void 0) { url = null; }
        if (method === void 0) { method = null; }
        if (data === void 0) { data = null; }
        this.url = url;
        this.method = method;
        this.data = data;
    }
    return ClientOptions;
}());
exports.ClientOptions = ClientOptions;
