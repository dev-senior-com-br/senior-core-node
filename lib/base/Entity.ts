import { HttpMethod } from '../model/HttpMethod';
import { RequestClient } from './RequestClient';
import { SeniorApi } from '../SeniorApi';
import { RequestReturn } from '../model/RequestReturn';

export class Entity extends RequestClient {
  private entityName: string;

  constructor(domain: string, service: string, entityName: string, seniorAPi: SeniorApi) {
    super(seniorAPi, domain, service);
    this.entityName = entityName;
  }

  get(filter = '', id: string): Promise<RequestReturn> {
    let url = this.getUrlPath(`entities/${this.entityName}`);
    if (id) {
      url += '/' + id;
    } else {
      if (filter) {
        url += '?filter=' + filter;
      }
    }
    const clientOptions = {
      url: this.getUrlPath(url),
      headers: {
        authorization: `Bearer ${this.seniorApi.accessToken}`,
      },
      method: HttpMethod.GET,
    };
    return this.request(clientOptions);
  }

  post(param: any, id: string): Promise<RequestReturn> {
    let url = `entities/${this.entityName}`;
    if (id) {
      url += `/${id}`;
    }
    const clientOptions = {
      url: this.getUrlPath(url),
      headers: {
        authorization: `Bearer ${this.seniorApi.accessToken}`,
      },
      method: HttpMethod.POST,
      data: param,
    };
    return this.request(clientOptions);
  }

  put(id: string, param: any): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath(`entities/${this.entityName}/${id}`),
      headers: {
        authorization: `Bearer ${this.seniorApi.accessToken}`,
      },
      method: HttpMethod.PUT,
      data: param,
    };
    return this.request(clientOptions);
  }

  patch(id: string, param: any): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath(`entities/${this.entityName}/${id}`),
      headers: {
        authorization: `Bearer ${this.seniorApi.accessToken}`,
      },
      method: HttpMethod.PATCH,
      data: param,
    };
    return this.request(clientOptions);
  }

  delete(id: string): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath(`entities/${this.entityName}/${id}`),
      headers: {
        authorization: `Bearer ${this.seniorApi.accessToken}`,
      },
      method: HttpMethod.DELETE,
    };
    return this.request(clientOptions);
  }
}
