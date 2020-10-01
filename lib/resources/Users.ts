import { RequestClient } from '../base/RequestClient';
import { HttpMethod } from '../model/HttpMethod';
import { SeniorApi } from '../SeniorApi';
import { PaginationDefault } from '../model/Pagination';
import { RequestReturn } from '../model';
import {
  ListGroupsDto,
  ListGroupUsersDto,
  CreateGroupDto,
  UpdateGroupDto,
  CreateUserDto,
  UpdateUserDto,
  UpdateGroupUsersDto,
} from '../dto/Users';

export class Users extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'user');
  }

  listGroups(dto: ListGroupsDto): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath('queries/listGroups'),
      method: HttpMethod.POST,
      data: {
        ...dto,
        searchValue: dto.searchValue ? dto.searchValue : '',
        pagination: dto.pagination ? { ...PaginationDefault, ...dto.pagination } : undefined,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  listGroupUsers(dto: ListGroupUsersDto): Promise<RequestReturn> {
    if (!dto.id) {
      throw new Error('O "id" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('queries/listGroupUsers'),
      method: HttpMethod.POST,
      data: {
        ...dto,
        searchValue: dto.searchValue ? dto.searchValue : '',
        pagination: dto.pagination
          ? { ...PaginationDefault, ...dto.pagination }
          : undefined,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  getGroup(id: string): Promise<RequestReturn> {
    if (!id) {
      throw new Error('O "id" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('queries/getGroup'),
      method: HttpMethod.POST,
      data: {
        id,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  getUser(username?: string): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath('queries/getUser'),
      method: HttpMethod.POST,
      data: {
        username,
      },
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  createGroup(dto: CreateGroupDto): Promise<RequestReturn> {
    if (!dto.name) {
      throw new Error('O "name" deve ser informado');
    }

    if (!dto.description) {
      throw new Error('O "description" deve ser informado');
    }

    if (!dto.email) {
      throw new Error('O "email" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/createGroup'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  updateGroup(dto: UpdateGroupDto): Promise<RequestReturn> {
    if (!dto.id) {
      throw new Error('O "id" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/updateGroup'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  createUser(dto: CreateUserDto): Promise<RequestReturn> {
    if (!dto.username) {
      throw new Error('O "username" deve ser informado');
    }

    if (!dto.fullName) {
      throw new Error('O "fullName" deve ser informado');
    }

    if (!dto.email) {
      throw new Error('O "email" deve ser informado');
    }

    if (!dto.password) {
      throw new Error('O "password" deve ser informado');
    }

    if (dto.changePassword === undefined || dto.changePassword === null) {
      throw new Error('o "changePassword" deve ser informado');
    }

    if (dto.blocked === undefined || dto.blocked === null) {
      throw new Error('o "blocked" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/createUser'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  updateUser(dto: UpdateUserDto): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath('actions/updateUser'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  deleteUser(username: string): Promise<RequestReturn> {
    if (!username) {
      throw new Error('O "username" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/deleteUser'),
      data: {
        username
      },
      method: HttpMethod.POST,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  updateGroupUsers(dto: UpdateGroupUsersDto): Promise<RequestReturn> {
    if (!dto.usersToAdd && !dto.usersToRemove) {
      throw new Error('O "usersToAdd" e/ou "usersToRemove" devem ser informados.');
    }

    if (!dto.groupId) {
      throw new Error('O "groupId" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/updateGroupUsers'),
      method: HttpMethod.POST,
      data: dto,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }

  deleteGroup(id: string): Promise<RequestReturn> {
    if (!id) {
      throw new Error('O "id" deve ser informado');
    }

    const clientOptions = {
      url: this.getUrlPath('actions/removeGroup'),
      data: {
        id
      },
      method: HttpMethod.POST,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }
}
