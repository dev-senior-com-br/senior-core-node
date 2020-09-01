import { Pagination, Properties } from '../model';

export interface ListGroupsDto {
  searchValue?: string;
  tenant?: string;
  pagination?: Pagination;
}

export interface ListGroupUsersDto {
  id: string;
  searchValue?: string;
  pagination?: Pagination;
}

export interface CreateGroupDto {
  name: string;
  description: string;
  email: string;
  users?: string[];
}

export interface UpdateGroupDto {
  id: string;
  name?: string;
  description?: string;
  email?: string;
  usersToAdd?: string[];
  usersToRemove?: string[];
}

export interface CreateUserDto {
  username: string;
  fullName: string;
  email: string;
  password: string;
  blocked: boolean;
  changePassword: boolean;
  description?: string;
  photo?: string;
  locale?: string;
  properties?: Properties[];
}

export interface UpdateUserDto {
  username?: string;
  fullName?: string;
  email?: string;
  description?: string;
  blocked?: boolean;
  changePassword?: boolean;
  photo?: string;
  locale?: string;
  properties?: Properties[];
}

export interface UpdateGroupUsersDto {
  usersToAdd?: string[];
  usersToRemove?: string[];
  groupId: string;
}
