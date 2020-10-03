import { HttpMethod } from './HttpMethod';

export class RequestOptions<T> {
  timeout: number;
  url: string;
  method: HttpMethod;
  headers: Record<string, string>;
  data: T;
  params: string;

  constructor(
    timeout = 30000,
    url: string = null,
    method: HttpMethod = null,
    headers: Record<string, string> = null,
    data: T = null,
    params: string = null
  ) {
    this.timeout = timeout;
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.data = data;
    this.params = params;
  }

  toOptions(): RequestOptions<T> & { headers: Record<string, string> } {
    return { ...this, headers: { ...this.headers } }; //clone
  }
}
