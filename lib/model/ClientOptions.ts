import { HttpMethod } from "./HttpMethod";
import { SeniorHeader } from "./SeniorHeader";

export class ClientOptions {
  url: string;
  method: HttpMethod;
  headers?: SeniorHeader = {};
  timeout?: number;
  data?: object;
  params?: string;
}
