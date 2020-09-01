import { HttpMethod } from '../model/HttpMethod';
import { SeniorApi } from '../SeniorApi';
import { RequestClient } from '../base/RequestClient';
import { RequestReturn } from '../model';
import { LoginDto, LoginMFADto, LoginWithKeyDto, RefreshTokenDto } from '../dto/Authentication';

export class Authentication extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'authentication');
  }

  login(dto: LoginDto): Promise<RequestReturn> {
    if (!dto.username) {
      throw new Error('O "username" deve ser informado');
    }
    if (!dto.password) {
      throw new Error('O "password" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/login'),
      method: HttpMethod.POST,
      data: dto,
    };

    return this.request(clientOptions);
  }

  logout(): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath('actions/logout'),
      method: HttpMethod.POST,
      data: {
        accessToken: this.seniorApi.accessToken,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  loginMFA(dto: LoginMFADto): Promise<RequestReturn> {
    if (!dto.temporaryToken) {
      throw new Error('O "temporaryToken" deve ser informado');
    }
    if (!dto.validationCode) {
      throw new Error('O "validationCode" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/loginMFA'),
      method: HttpMethod.POST,
      data: dto,
    };

    return this.request(clientOptions);
  }
  loginWithKey(dto: LoginWithKeyDto): Promise<RequestReturn> {
    if (!dto.accessKey) {
      throw new Error('O "accessKey" deve ser informado');
    }
    if (!dto.secret) {
      throw new Error('O "secret" deve ser informado');
    }
    if (!dto.tenantName) {
      throw new Error('O "tenantName" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/loginWithKey', true),
      method: HttpMethod.POST,
      data: dto,
    };
    return this.request(clientOptions);
  }

  refreshToken(dto: RefreshTokenDto): Promise<RequestReturn> {
    if (!dto.tenantName) {
      throw new Error('O "tenantName" deve ser informado');
    }
    if (!dto.refreshToken) {
      throw new Error('O "refreshToken" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/refreshToken'),
      method: HttpMethod.POST,
      data: {
        refreshToken: dto.refreshToken,
      },
      headers: {
        'X-Tenant': dto.tenantName,
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }
}
