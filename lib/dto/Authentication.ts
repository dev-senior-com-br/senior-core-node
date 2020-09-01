export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginMFADto {
  temporaryToken: string;
  validationCode: number;
}

export interface LoginWithKeyDto {
  accessKey: string;
  secret: string;
  tenantName: string;
}

export interface RefreshTokenDto {
  tenantName: string;
  refreshToken: string;
}
