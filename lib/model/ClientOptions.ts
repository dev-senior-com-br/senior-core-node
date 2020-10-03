import { HttpMethod } from './HttpMethod';
import { SeniorHeader } from './SeniorHeader';

export class ClientOptions<T> {
  url: string;
  method: HttpMethod;
  headers?: SeniorHeader = {};
  timeout?: number;
  data?: T;
  params?: string;
}
