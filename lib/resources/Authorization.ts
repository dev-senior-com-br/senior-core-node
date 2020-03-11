import { ClientOptions } from "../model/ClientOptions";
import { HttpMethod } from "../model/HttpMethod";
import RequestClient from "../base/RequestClient";
import SeniorApi from "../SeniorApi";

export default class Authorization {
  seniorApi: SeniorApi;
  _client: RequestClient;

  constructor(seniorApi: SeniorApi) {
    this.seniorApi = seniorApi;
  }

  get client() {
    this._client = this._client || new RequestClient(this.seniorApi);
    return this._client;
  }

  getResource = (uri: string) => {
    if (!uri) {
      throw new Error('A "uri" deve ser informada');
    }

    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/queries/getResource",
      HttpMethod.POST,
      {
        uri
      }
    );

    return this.client.request(clientOptions);
  };

  checkAccess = (resource: string, action: string, attributes: string) => {
    if (!resource) {
      throw new Error('O "resource" deve ser informado');
    }
    if (!action) {
      throw new Error('A "action" deve ser informada');
    }
    if (!attributes) {
      throw new Error('Os "attributes" devem ser informados');
    }

    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/checkAccess",
      HttpMethod.POST,
      {
        permissions: [
          {
            resource,
            action,
            attributes
          }
        ],
        includeFilters: false,
        includeDelegations: false
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;

    return this.client.request(clientOptions);
  };

  saveResources = (resources: object) => {
    if (!resources) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/saveResources",
      HttpMethod.POST,
      {
        resources
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;
    return this.client.request(clientOptions);
  };

  deleteResources = (resources: object) => {
    if (!resources) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/deleteResources",
      HttpMethod.POST,
      {
        resources
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;

    return this.client.request(clientOptions);
  };

  createRole = (name: string, description: string) => {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    if (!description) {
      throw new Error('O "description" deve ser informado');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/createRole",
      HttpMethod.POST,
      {
        name,
        description
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;
    return this.client.request(clientOptions);
  };

  getRole = (name: string) => {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/queries/getRole",
      HttpMethod.POST,
      {
        name
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;

    return this.client.request(clientOptions);
  };

  deleteRole = (name: string) => {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/deleteRole",
      HttpMethod.POST,
      {
        name
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;

    return this.client.request(clientOptions);
  };

  assignUsers = (roles: string[], users: string[]) => {
    if (!roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/assignUsers",
      HttpMethod.POST,
      {
        roles,
        users
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;

    return this.client.request(clientOptions);
  };

  unassignUsers = (roles: string[], users: string[]) => {
    if (!roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = new ClientOptions(
      "/rest/platform/authorization/actions/unassignUsers",
      HttpMethod.POST,
      {
        roles,
        users
      }
    );
    clientOptions.accessToken = this.seniorApi.accessToken;

    return this.client.request(clientOptions);
  };
}
