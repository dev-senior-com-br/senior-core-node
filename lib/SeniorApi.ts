import Authentication from "./resources/Authentication";
import Authorization from "./resources/Authorization";
import Tenant from "./resources/Tenant";
import Notification from "./resources/Notification";
import Users from "./resources/Users";

export default class SeniorApi {
  password: string = null;
  username: string = null;
  accessToken: string = null;
  _authentication: Authentication;
  _authorization: Authorization;
  _tenant: Tenant;
  _notification: Notification;
  _users: Users;
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

  get tenant(): Tenant {
    this._tenant = this._tenant || new Tenant(this);
    return this._tenant;
  }

  get notification(): Notification {
    this._notification = this._notification || new Notification(this);
    return this._notification;
  }

  get users(): Users {
    this._users = this._users || new Users(this);
    return this._users;
  }
}