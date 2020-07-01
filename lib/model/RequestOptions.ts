import { HttpMethod } from "./HttpMethod";

export class RequestOptions {
  timeout: number;
  url: string;
  method: HttpMethod;
  headers: Map<string, string>;
  data: object;
  params: string;

  constructor(
    timeout: number = 30000,
    url: string = null,
    method: HttpMethod = null,
    headers: Map<string, string> = null,
    data: object = null,
    params: string = null
  ) {
    this.timeout = timeout;
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.data = data;
    this.params = params;
  }

  public toTOptions(): object {
    let localHeaders = {};
    this.headers.forEach((value, key) => {
      localHeaders[key] = value
    });

    let objectReturn = {
      timeout: this.timeout,
      url: this.url,
      method: this.method,
      headers: localHeaders,
      data: this.data,
      params: this.params
    };
    return objectReturn;
  }
}
