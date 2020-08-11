import { HttpMethod } from '../model/HttpMethod';
import { RequestClient } from './RequestClient';
import { SeniorApi } from '../SeniorApi';
import { EntityList } from '../model/EntityList';
import { RequestReturn } from '../model/RequestReturn';

export class Entity<T> extends RequestClient {
  #entityName: string;

  constructor(domain: string, service: string, entityName: string, seniorAPi: SeniorApi) {
    super(seniorAPi, domain, service);
    this.#entityName = entityName;
  }

  /**
   * Faz um get da entidade podendo ser por id ou por um filtro. 
   * @param {{ filter?: string, id?: string }} getOptions Opções de listagem, 
   * para mais informações sobre {@link FilterBuilder}. Opcional. 
   * @returns {Promise<RequestReturn<EntityList<T>>>} retorna uma promise com a resposta da plataforma 
   * contendo no atributo `data` uma lista de entidades.
   */
  get(getOptions: { filter?: string, id?: string } = {}): Promise<RequestReturn<EntityList<T>>> {
    let url = `entities/${this.#entityName}`;
    if(getOptions.id) {
      url += '/' + getOptions.id;
    } else if(getOptions.filter) {
      url += '?filter=' + getOptions.filter;
    }
    const clientOptions = {
      url: this.getUrlPath(url),
      headers: {
        authorization: this.seniorApi.accessToken,
      },
      method: HttpMethod.GET,
    };
    return this.request(clientOptions);
  }

  /**
   * Faz um post de um objeto da entidade podendo passar um id para substituir a entidade
   * @param {T} entity um objeto da entidade a ser criada.
   * @param {string} id Id da entidade a ser substituida. Opcional.
   * @returns {Promise<RequestReturn>} retorna uma promise com a resposta da plataforma contendo no atributo `data` 
   * o valor do id criado, atributo no padrão: `idNomeDaEntidade`. 
   * 
   * Ex: `{ idUsuario: 'uuid_gerado' }`
   */
  post(entity: T, id?: string): Promise<RequestReturn> {
    let url = `entities/${this.#entityName}`;
    if (id) {
      url += `/${id}`;
    }
    const clientOptions = {
      url: this.getUrlPath(url),
      headers: {
        authorization: this.seniorApi.accessToken,
      },
      method: HttpMethod.POST,
      data: entity,
    };
    return this.request(clientOptions);
  }

  put(id: string, entity: T): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath(`entities/${this.#entityName}/${id}`),
      headers: {
        authorization: this.seniorApi.accessToken,
      },
      method: HttpMethod.PUT,
      data: entity,
    };
    return this.request(clientOptions);
  }

  delete(id: string): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath(`entities/${this.#entityName}/${id}`),
      headers: {
        authorization: this.seniorApi.accessToken,
      },
      method: HttpMethod.DELETE,
    };
    return this.request(clientOptions);
  }
}
