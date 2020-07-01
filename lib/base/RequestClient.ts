import { ClientOptions } from "../model/ClientOptions";
import { RequestOptions } from "../model/RequestOptions";
import {SeniorApi} from "../SeniorApi";
import {ENVIRONMENTS} from "../Environments";
import { Domain } from "./Domain";
import axios, { AxiosResponse } from "axios";

export class RequestClient {
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

    if(opts.data) {
      options.data = opts.data;
    }

    if(opts.params) {
      options.params = opts.params;
    }

    return axios(options.url, options.toTOptions()).then((res: AxiosResponse) => {
      return {... res, statusCode: res.status, body: res.data};
    });
  };

  getUrlPath = (path: string, anonymous: boolean = false) => {
    ///anonymous/rest/platform/authentication/actions/loginWithKey"
    if (this.seniorApi._environment == ENVIRONMENTS.DEV)
      return `${anonymous ? '/anonymous' : ''}/rest/${this.domain}/${this.service}/${path}`
    else
      return `/${this.domain}/${this.service}${anonymous ? '/anonymous' : ''}/${path}`
  }
}
