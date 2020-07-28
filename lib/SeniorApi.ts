import { Authentication } from './resources/Authentication';
import { Authorization } from './resources/Authorization';
import { Tenant } from './resources/Tenant';
import { Notification } from './resources/Notification';
import { Users } from './resources/Users';
import { Entity } from './base/Entity';
import { ENVIRONMENTS } from './Environments';

export class SeniorApi {
  accessToken: string = null;
  #authentication: Authentication;
  #authorization: Authorization;
  #tenant: Tenant;
  #notification: Notification;
  #users: Users;
  #environment = ENVIRONMENTS.DEV;

  get authentication(): Authentication {
    this.#authentication = this.#authentication || new Authentication(this);
    return this.#authentication;
  }

  get authorization(): Authorization {
    this.#authorization = this.#authorization || new Authorization(this);
    return this.#authorization;
  }

  get tenant(): Tenant {
    this.#tenant = this.#tenant || new Tenant(this);
    return this.#tenant;
  }

  get notification(): Notification {
    this.#notification = this.#notification || new Notification(this);
    return this.#notification;
  }

  get users(): Users {
    this.#users = this.#users || new Users(this);
    return this.#users;
  }

  set environment(value: string) {
    this.#environment = ENVIRONMENTS[value];
  }

  get environment(): string {
    this.#environment = this.#environment || ENVIRONMENTS.DEV;
    return this.#environment;
  }

  getEntity(domain: string, service: string, entityName: string): Entity {
    return new Entity(domain, service, entityName, this);
  }
}
