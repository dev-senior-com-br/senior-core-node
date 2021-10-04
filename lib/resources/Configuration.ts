import { HttpMethod } from '../model/HttpMethod';
import { SeniorApi } from '../SeniorApi';
import { RequestClient } from '../base/RequestClient';
import { RequestReturn } from '../model';
import { BodyCustomPropertyDto, CustomPropertyDto, ServicePropertiesDto } from '../dto/Configuration';

export class Configuration extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'configuration');
  }

  listServiceProperties(dto: ServicePropertiesDto): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath('queries/listServiceProperties'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      }
    };

    return this.request(clientOptions);
  }

  getCustomProperty(dto: CustomPropertyDto): Promise<RequestReturn> {
    if (!dto.propertyKey) {
      throw new Error('O "propertyKey" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('queries/getCustomProperty'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      }
    };

    return this.request(clientOptions);
  }

  createCustomProperty(dto: BodyCustomPropertyDto): Promise<RequestReturn> {
    if (!dto.propertyKey) {
      throw new Error('O "propertyKey" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/createCustomProperty'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      }
    };
    
    return this.request(clientOptions);
  }

  updateCustomProperty(dto: BodyCustomPropertyDto): Promise<RequestReturn> {
    if (!dto.propertyKey) {
      throw new Error('O "propertyKey" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/updateCustomProperty'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      }
    };

    return this.request(clientOptions);
  }

  deleteCustomProperty(dto: CustomPropertyDto): Promise<RequestReturn> {
    if (!dto.propertyKey) {
      throw new Error('O "propertyKey" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/deleteCustomProperty'),
      method: HttpMethod.DELETE,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      }
    };

    return this.request(clientOptions);
  }

}
