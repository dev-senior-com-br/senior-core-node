import { HttpMethod } from "./HttpMethod";

export class ClientOptions {
  url: string;
  method: HttpMethod;
  headers: Map<string, string>;
  accessToken: string;
  timeout: number;
  data: object;
  params: string;

  constructor(
    url: string = null,
    method: HttpMethod = null,
    data: object = null
  ) {
    this.url = url;
    this.method = method;
    this.data = data;
  }
}
