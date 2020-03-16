import { HttpMethod } from "../model/HttpMethod";
import RequestClient from "../base/RequestClient";
import SeniorApi from "../SeniorApi";

export default class Authorization extends RequestClient {
  
  constructor(seniorApi: SeniorApi) {
    super(seniorApi);
  }

  getResource = (uri: string) => {
    if (!uri) {
      throw new Error('A "uri" deve ser informada');
    }

    const clientOptions = {
      url: "/rest/platform/authorization/queries/getResource",
      method: HttpMethod.POST,
      data: {
        uri
      }
    };

    return this.request(clientOptions);
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

    const clientOptions = {
      url: "/rest/platform/authorization/actions/checkAccess",
      method: HttpMethod.POST,
      data: {
        permissions: [
          {
            resource,
            action,
            attributes
          }
        ],
        includeFilters: false,
        includeDelegations: false
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };

    return this.request(clientOptions);
  };

  saveResources = (resources: object) => {
    if (!resources) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/actions/saveResources",
      method: HttpMethod.POST,
      data: {
        resources
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };
    return this.request(clientOptions);
  };

  deleteResources = (resources: object) => {
    if (!resources) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/actions/deleteResources",
      method: HttpMethod.POST,
      data: {
        resources
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };

    return this.request(clientOptions);
  };

  createRole = (name: string, description: string) => {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    if (!description) {
      throw new Error('O "description" deve ser informado');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/actions/createRole",
      method: HttpMethod.POST,
      data: {
        name,
        description
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };
    return this.request(clientOptions);
  };

  getRole = (name: string) => {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/queries/getRole",
      method: HttpMethod.POST,
      data: {
        name
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };

    return this.request(clientOptions);
  };

  deleteRole = (name: string) => {
    if (!name) {
      throw new Error('O "name" deve ser informado');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/actions/deleteRole",
      method: HttpMethod.POST,
      data: {
        name
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };

    return this.request(clientOptions);
  };

  assignUsers = (roles: string[], users: string[]) => {
    if (!roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/actions/assignUsers",
      method: HttpMethod.POST,
      data: {
        roles,
        users
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };

    return this.request(clientOptions);
  };

  unassignUsers = (roles: string[], users: string[]) => {
    if (!roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = {
      url: "/rest/platform/authorization/actions/unassignUsers",
      method: HttpMethod.POST,
      data: {
        roles,
        users
      },
      headers: {
        authorization: this.seniorApi.accessToken
      }
    };

    return this.request(clientOptions);
  };
}
