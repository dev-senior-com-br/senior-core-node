import RequestClient from "../base/RequestClient";
import { HttpMethod } from "../model/HttpMethod";
import SeniorApi from "../SeniorApi";

export default class Authentication extends RequestClient {

  constructor(seniorApi: SeniorApi) {
    super(seniorApi);
  }

  login = (username: string, password: string) => {
    if (!username) {
      throw new Error('O "username" deve ser informado');
    }

    if (!password) {
      throw new Error('O "password" deve ser informado');
    }
    const clientOptions = {
      url: "/rest/platform/authentication/actions/login",
      method: HttpMethod.POST,
      data: {
        username: username,
        password: password
      }
    };

    return this.request(clientOptions);
  };

  logout = () => {
    const clientOptions = {
      url: "/rest/platform/authentication/actions/logout",
      method: HttpMethod.POST,
      data: {
        access_token: this.seniorApi.accessToken
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };
    return this.request(clientOptions);
  };

  loginMFA = (temporaryToken: string, validationCode: number) => {
    const clientOptions = {
      url: "/rest/platform/authentication/actions/loginMFA",
      method: HttpMethod.POST,
      data: {
        temporaryToken,
        validationCode
      }
    };

    return this.request(clientOptions);
  };
  loginWithKey = (accessKey: string, secret: string, tenantName: string) => {
    const clientOptions = {
      url: "/anonymous/rest/platform/authentication/actions/loginWithKey",
      method: HttpMethod.POST,
      data: {
        accessKey,
        secret,
        tenantName
      }
    };
    return this.request(clientOptions);
  };
  refreshToken = (tenantName: string, refreshToken: string) => {
    const clientOptions = {
      url: "/rest/platform/authentication/actions/refreshToken", 
      method: HttpMethod.POST, 
      data: {
          refreshToken: refreshToken
      },
      headers: {
          "X-Tenant": tenantName,
          authorization: this.seniorApi.accessToken
      },
    };
    return this.request(clientOptions);
  };
}
