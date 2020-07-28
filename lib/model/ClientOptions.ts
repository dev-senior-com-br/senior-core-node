import { HttpMethod } from './HttpMethod';
import { SeniorHeader } from './SeniorHeader';

export class ClientOptions {
  url: string;
  method: HttpMethod;
  headers?: SeniorHeader = {};
  timeout?: number;
  data?: Record<string, any>;
  params?: string;
}
