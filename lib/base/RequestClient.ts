import { ClientOptions } from "../model/ClientOptions";
import { RequestOptions } from "../model/RequestOptions";
import Domain from "./Domain";
import * as _ from "lodash";
import * as Q from "q";
import http from "request";
import SeniorApi from "../SeniorApi";
import ENVIRONMENTS from "../Environments";

export default class RequestClient {
  seniorApi: SeniorApi;
  private baseUrl: string;
  domain: string;
  service: string;

  constructor(seniorApi: SeniorApi, domain: string, service: string) {
    this.seniorApi = seniorApi;
    this.baseUrl = new Domain(this.seniorApi).baseUrl;
    this.domain = domain;
    this.service = service;
  }
  /**
   * @param {ClientOptions}
   *            opts
   */
  request = (opts: ClientOptions = new ClientOptions()) => {
    if (!opts.method) {
      throw new Error('O "method" deve ser informado');
    }

    if (!opts.url) {
      throw new Error('A "url" deve ser informada');
    }

    const deferred = Q.defer();
    const headers = new Map<string, string>();
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    if (opts.headers) {
      if (opts.headers["X-Tenant"]) {
        headers.set("X-Tenant", opts.headers["X-Tenant"]);
      }
      if (opts.headers["seniorx.version"]) {
        headers.set("seniorx.version", String(opts.headers["seniorx.version"]));
      }
      if (opts.headers.authorization) {
        headers.set("Authorization", "Bearer " + opts.headers.authorization);
      }
    }

    // opções de request
    const options = new RequestOptions(
      opts.timeout,
      this.baseUrl + opts.url,
      opts.method,
      headers
    );

    if (!_.isNull(opts.data)) {
      options.json = opts.data;
    }

    if (!_.isNull(opts.params)) {
      options.qs = opts.params;
      options.useQuerystring = true;
    }

    http(options.url, options.toTOptions(), (error, response) => {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve({
          statusCode: response.statusCode,
          body: response.body
        });
      }
    });

    return deferred.promise;
  };

  getUrlPath = (path: string, anonymous: boolean = false) => {
    ///anonymous/rest/platform/authentication/actions/loginWithKey"
    if (this.seniorApi._environment == ENVIRONMENTS.DEV)
      return `${anonymous ? '/anonymous' : ''}/rest/${this.domain}/${this.service}/${path}`
    else
      return `/${this.domain}/${this.service}${anonymous ? '/anonymous' : ''}/${path}`
  }
}
