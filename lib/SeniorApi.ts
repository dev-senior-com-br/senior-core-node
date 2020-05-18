import Authentication from "./resources/Authentication";
import Authorization from "./resources/Authorization";
import Tenant from "./resources/Tenant";
import Notification from "./resources/Notification";
import Users from "./resources/Users";
import Entity from "./base/Entity";

enum ENVIRONMENTS {
                   DEV = "https://platform-homologx.senior.com.br/t/senior.com.br/bridge/1.0", 
                   PROD = "https://platform.senior.com.br/t/senior.com.br/bridge/1.0"
                  };

export default class SeniorApi {
  accessToken: string = null;
  _authentication: Authentication;
  _authorization: Authorization;
  _tenant: Tenant;
  _notification: Notification;
  _users: Users;
  _environment = ENVIRONMENTS.DEV;

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

  get environment(): string {
    this._environment = this._environment || ENVIRONMENTS.DEV;
    return this._environment;
  }

  getEntity(domain: string, service: string, entityName: string) {
    return new Entity(domain, service, entityName, this);
  }
}