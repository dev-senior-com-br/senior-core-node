'use strict';

var Domain = require('./Domain');
var _ = require('lodash');
var http = require('request');
var Q = require('q');

function RequestClient(seniorApi) {
	Domain.prototype.constructor.call(this, seniorApi);
}

/**
 * @param {object}
 *            opts
 * @param {string}
 *            opts.method
 * @param {string}
 *            opts.url
 * @param {string}
 *            opts.accessToken
 */
RequestClient.prototype.request = function(opts) {
	opts = opts || {};

	if (!opts.method) {
		throw new Error('O "method" deve ser informado');
	}

	if (!opts.url) {
		throw new Error('A "url" deve ser informada');
	}

	var deferred = Q.defer();
	var headers = {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	};

	if (opts.headers){
		headers = _.merge(headers, opts.headers);
	}

	if (opts.accessToken) {
		headers.Authorization = 'Bearer ' + opts.accessToken;
	}

	var options = {
		timeout : opts.timeout || 30000,
		url : this.baseUrl + opts.url,
		method : opts.method,
		headers : headers
	};

	if (!_.isNull(opts.data)) {
		options.json = opts.data;
	}

	if (!_.isNull(opts.params)) {
		options.qs = opts.params;
		options.useQuerystring = true;
	}

	http(options, function(error, response) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve({
				statusCode : response.statusCode,
				body : response.body,
			});
		}
	});

	return deferred.promise;
};

module.exports = RequestClient;
