import { ClientOptions } from "../model/ClientOptions";
import { RequestOptions } from "../model/RequestOptions";
import Domain from "./Domain";
import * as _ from "lodash";
import * as Q from "q";
import * as http from "request";
import SeniorApi from "../SeniorApi";

export default class RequestClient {
  seniorApi: SeniorApi;
  private baseUrl: string;

  constructor(seniorApi: SeniorApi) {
    this.seniorApi = seniorApi;
    this.baseUrl = new Domain(this.seniorApi).baseUrl;
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
    let headers = new Map<string, string>();
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    if (opts.headers) {
      headers = _.merge(headers, opts.headers);
    }

    if (opts.accessToken) {
      headers.set("Authorization", `Bearer ${opts.accessToken}`);
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
}
