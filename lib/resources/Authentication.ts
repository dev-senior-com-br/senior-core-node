import RequestClient from "../base/RequestClient";
import { ClientOptions } from "../model/ClientOptions";
import { HttpMethod } from "../model/HttpMethod";
import SeniorApi from "../SeniorApi";

export default class Authentication {
  seniorApi: SeniorApi;
  private _client: RequestClient;

  constructor(seniorApi: SeniorApi) {
    this.seniorApi = seniorApi;
  }

  get client(): RequestClient {
    this._client = this._client || new RequestClient(this.seniorApi);
    return this._client;
  }

  login = () => {
    const clientOptions = new ClientOptions(
      "/rest/platform/authentication/actions/login",
      HttpMethod.POST,
      {
        username: this.seniorApi.username,
        password: this.seniorApi.password
      }
    );

    return this.client.request(clientOptions);
  };

  logout = () => {
    const clientOptions = new ClientOptions(
      "/rest/platform/authentication/actions/logout",
      HttpMethod.POST,
      {
        access_token: this.seniorApi.accessToken
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;
    return this.client.request(clientOptions);
  };

  loginMFA = (temporaryToken: string, validationCode: number) => {
    const clientOptions = new ClientOptions(
      "/rest/platform/authentication/actions/loginMFA",
      HttpMethod.POST,
      {
        temporaryToken,
        validationCode
      }
    );

    return this.client.request(clientOptions);
  };
  loginWithKey = (accessKey: string, secret: string, tenantName: string) => {
    const clientOptions = new ClientOptions(
      "/anonymous/rest/platform/authentication/actions/loginWithKey",
      HttpMethod.POST,
      {
        accessKey,
        secret,
        tenantName
      }
    );
    return this.client.request(clientOptions);
  };
  refreshToken = (tenantName: string, refreshToken: string) => {
    const clientOptions = new ClientOptions(
      "/rest/platform/authentication/actions/refreshToken",
      HttpMethod.POST,
      {
        refreshToken
      }
    );

    clientOptions.headers = new Map<string, string>();
    clientOptions.headers.set("X-Tenant", tenantName);
    return this.client.request(clientOptions);
  };
}
