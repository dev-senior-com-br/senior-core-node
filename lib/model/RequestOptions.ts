import { HttpMethod } from './HttpMethod';

export class RequestOptions {
  timeout: number;
  url: string;
  method: HttpMethod;
  headers: Map<string, string>;
  json: object;
  qs: string;
  useQuerystring: boolean;

  constructor(
    timeout: number = 30000,
    url: string = null,
    method: HttpMethod = null,
    headers: Map<string, string> = null,
    json: object = null,
    qs: string = null,
    useQuerystring: boolean = false,
  ) {
    this.timeout = timeout;
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.json = json;
    this.qs = qs;
    this.useQuerystring = useQuerystring;
  }

  public toTOptions(): object {
    return {
      timeout: this.timeout,
      url: this.url,
      method: this.method,
      headers: this.headers,
      json: this.json,
      qs: this.qs,
      useQuerystring: this.useQuerystring,
    };
  }
}
