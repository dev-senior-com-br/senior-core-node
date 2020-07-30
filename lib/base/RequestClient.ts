import { ClientOptions } from '../model/ClientOptions';
import { RequestOptions } from '../model/RequestOptions';
import { SeniorApi } from '../SeniorApi';
import { Platform } from './Platform';
import axios, { AxiosResponse } from 'axios';
import { RequestReturn } from '../model/RequestReturn';

export class RequestClient {
  seniorApi: SeniorApi;
  #platform: Platform;
  domain: string;
  service: string;

  constructor(seniorApi: SeniorApi, domain: string, service: string) {
    this.seniorApi = seniorApi;
    this.#platform = seniorApi.platform;
    this.domain = domain;
    this.service = service;
  }
  /**
   * @param {ClientOptions}
   * @returns {RequestReturn<T>}
   */
  request<T>(opts: ClientOptions = new ClientOptions()): Promise<RequestReturn<T>> {
    if (!opts.method) {
      throw new Error('O "method" deve ser informado');
    }

    if (!opts.url) {
      throw new Error('A "url" deve ser informada');
    }

    const headers: Record<string, string> = {};
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';

    if (opts.headers) {
      if (opts.headers['X-Tenant']) {
        headers['X-Tenant'] = opts.headers['X-Tenant'];
      }
      if (opts.headers['seniorx.version']) {
        headers['seniorx.version'] = String(opts.headers['seniorx.version']);
      }
      if (opts.headers.authorization) {
        headers['Authorization'] = 'Bearer ' + opts.headers.authorization;
      }
    }

    // opções de request
    const options = new RequestOptions(opts.timeout, opts.url, opts.method, headers);

    if (opts.data) {
      options.data = opts.data;
    }

    if (opts.params) {
      options.params = opts.params;
    }

    return axios(options.url, options.toOptions()).then(
      (res: AxiosResponse): RequestReturn<T> => {
        return { ...res, statusCode: res.status, body: res.data };
      }
    );
  }

  getUrlPath(path: string, anonymous = false): string {
    ///anonymous/rest/platform/authentication/actions/loginWithKey"
    let baseUrl: string = null;
    if (anonymous) {
      baseUrl = this.#platform.anonymousUrl;
    } else {
      baseUrl = this.#platform.restUrl;
    }
    return this.#platform.getUrlPath(baseUrl, this.domain, this.service, path);
  }
}
