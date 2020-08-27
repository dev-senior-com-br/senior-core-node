import { Authentication } from './resources/Authentication';
import { Authorization } from './resources/Authorization';
import { Tenant } from './resources/Tenant';
import { Notification } from './resources/Notification';
import { Users } from './resources/Users';
import { Entity } from './base/Entity';
import { Platform } from './base/Platform';
import { ENVIRONMENTS } from './Environments';
import { Blob } from './resources/Blob';

export class SeniorApi {
  accessToken: string = null;
  #authentication: Authentication;
  #authorization: Authorization;
  #tenant: Tenant;
  #notification: Notification;
  #users: Users;
  #blob: Blob
  #platform: Platform = new Platform(ENVIRONMENTS.DEV);

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

  get blob(): Blob {
    this.#blob = this.#blob || new Blob(this);
    return this.#blob;
  }

  setUrl(url: string): void {
    this.setEnvironment(url);
  }

  setEnvironment(env: ENVIRONMENTS): void
  setEnvironment(url: string): void
  setEnvironment(envOrUrl: ENVIRONMENTS | string): void {
    this.#platform = new Platform(envOrUrl);
  }

  get platform(): Platform {
    return this.#platform;
  }

  getEntity<T>(domain: string, service: string, entityName: string): Entity<T> {
    return new Entity(domain, service, entityName, this);
  }
}
