import { HttpMethod } from '../model/HttpMethod';
import { RequestClient } from '../base/RequestClient';
import { SeniorApi } from '../SeniorApi';
import { RequestReturn } from '../model';
import {
  CheckAccessDto,
  SaveResourcesDto,
  CreateRoleDto,
  AssignUsersDto,
  UnassignUsersDto,
} from '../dto/Authorization';

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

  checkAccess(dto: CheckAccessDto): Promise<RequestReturn> {
    if (!dto.resource) {
      throw new Error('O "resource" deve ser informado');
    }
    if (!dto.action) {
      throw new Error('A "action" deve ser informada');
    }

    const clientOptions = {
      url: this.getUrlPath('queries/checkAccess'),
      method: HttpMethod.POST,
      data: {
        permissions: [
          {
            ...dto,
            attributes: dto.attributes ? dto.attributes : [],
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

  saveResources(resources: SaveResourcesDto): Promise<RequestReturn> {
    if (!resources || resources.length === 0) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/saveResources'),
      method: HttpMethod.POST,
      data: {
        dto: resources,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  deleteResources(resourcesURI: string[]): Promise<RequestReturn> {
    if (!resourcesURI) {
      throw new Error('Os "resources" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/deleteResources'),
      method: HttpMethod.POST,
      data: {
        resources: resourcesURI,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  createRole(dto: CreateRoleDto): Promise<RequestReturn> {
    if (!dto.name) {
      throw new Error('O "name" deve ser informado');
    }
    if (!dto.description) {
      throw new Error('O "description" deve ser informado');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/createRole'),
      method: HttpMethod.POST,
      data: {
        ...dto,
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
        name,
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

  listRoles(searchValue = ''): Promise<RequestReturn> {
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

  assignUsers(dto: AssignUsersDto): Promise<RequestReturn> {
    if (!dto.roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!dto.users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/assignUsers'),
      method: HttpMethod.POST,
      data: {
        ...dto,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  unassignUsers(dto: UnassignUsersDto): Promise<RequestReturn> {
    if (!dto.roles) {
      throw new Error('Os "roles" devem ser informados');
    }
    if (!dto.users) {
      throw new Error('Os "users" devem ser informados');
    }
    const clientOptions = {
      url: this.getUrlPath('actions/unassignUsers'),
      method: HttpMethod.POST,
      data: {
        ...dto,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }
}
