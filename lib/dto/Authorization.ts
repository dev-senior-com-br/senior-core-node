export interface CheckAccessDto {
  resource: string;
  action: string;
  attributes?: Attribute[];
}

export type SaveResourcesDto = Resource[];

export interface Action {
  name: string;
  label?: string;
  master?: boolean;
  hasAttributes?: boolean;
  /**
   * Default false
   */
  locked?: boolean;
}

export interface Resource {
  uri: string;
  /**
   * Obrigatório na criação de um rosource
   */
  name?: string;
  label?: string;
  description?: string;
  actions: Action[];
  domainName?: string;
  serviceName?: string;
}

export interface Attribute {
  attribute: string;
  value: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
}

export interface AssignUsersDto {
  /**
   * Nome dos papeis onde os usuarios serão atribuídos
   */
  roles: string[];
  /**
   * Usuários a serem incluidos nos papeis
   */
  users: string[];
}

export interface UnassignUsersDto {
  /**
   * Nome dos papeis onde os usuarios serão desatribuídos
   */
  roles: string[];
  /**
   * Usuários a serem removidos dos papeis
   */
  users: string[];
}
