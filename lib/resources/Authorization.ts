import { HttpMethod } from '../model/HttpMethod';
import { RequestClient } from '../base/RequestClient';
import { SeniorApi } from '../SeniorApi';
import { RequestReturn } from '../model';

export class Authorization extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'authorization');
  }

  getResource(uri: string): Promise<RequestReturn> {
    if (!uri) {
      throw new Error('A "uri" deve ser informada');
    }

    const clientOptions = {
      url: this.getUrlPath('queries/getResource'),
      method: HttpMethod.POST,
      data: {
        uri,
      },
    };

    return this.request(clientOptions);
  }

  checkAccess(resource: string, action: string, attributes: string): Promise<RequestReturn> {
    if (!resource) {
      throw new Error('O "resource" deve ser informado');
    }
    if (!action) {
      throw new Error('A "action" deve ser informada');
    }
    if (!attributes) {
      throw new Error('Os "attributes" devem ser informados');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/checkAccess'),
      method: HttpMethod.POST,
      data: {
        permissions: [
          {
            resource,
            action,
            attributes,
          },
        ],
        includeFilters: false,
        includeDelegations: false,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  saveResources(resources: any[]): Promise<RequestReturn> {
    if (!resources || resources.length === 0) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/saveResources'),
      method: HttpMethod.POST,
      data: {
        resources,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  deleteResources(resources: any): Promise<RequestReturn> {
    if (!resources) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/deleteResources'),
      method: HttpMethod.POST,
      data: {
        resources,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  createRole(name: string, description: string): Promise<RequestReturn> {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    if (!description) {
      throw new Error('O "description" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/createRole'),
      method: HttpMethod.POST,
      data: {
        name,
        description,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  getRole(name: string): Promise<RequestReturn> {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('queries/getRole'),
      method: HttpMethod.POST,
      data: {
        name
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  deleteRole(name: string): Promise<RequestReturn> {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/deleteRole'),
      method: HttpMethod.POST,
      data: {
        name,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  listRoles(searchValue: string): Promise<RequestReturn> {
    if (!searchValue) {
      throw new Error('O "name" devem ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('queries/listRoles'),
      method: HttpMethod.POST,
      data: {
        searchValue,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    console.log(clientOptions);
    return this.request(clientOptions);
  }

  assignUsers(roles: string[], users: string[]): Promise<RequestReturn> {
    if (!roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/assignUsers'),
      method: HttpMethod.POST,
      data: {
        roles,
        users,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  unassignUsers(roles: string[], users: string[]): Promise<RequestReturn> {
    if (!roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/unassignUsers'),
      method: HttpMethod.POST,
      data: {
        roles,
        users,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }
}
