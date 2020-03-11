import Authentication from "./resources/Authentication";
import Authorization from "./resources/Authorization";

export default class SeniorApi {
  password: string = null;
  username: string = null;
  accessToken: string = null;
  _authentication: Authentication;
  _authorization: Authorization;
  constructor(username: string, password: string) {
    if (!username) {
      throw new Error('O "username" deve ser informado');
    }

    if (!password) {
      throw new Error('O "password" deve ser informado');
    }
    this.username = username;
    this.password = password;
  }

  get authentication(): Authentication {
    this._authentication = this._authentication || new Authentication(this);
    return this._authentication;
  }

  get authorization(): Authorization {
    this._authorization = this._authorization || new Authorization(this);
    return this._authorization;
  }
}