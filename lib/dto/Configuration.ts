export interface BodyCustomPropertyDto {
  propertyKey: string;
  type: string;
  propertyValue: string,
  hashTags: [],
  label: string,
  propertyLevel: string
}

export interface CustomPropertyDto {
  propertyKey: string;
}

export interface ServicePropertiesDto {
  dominio: string;
  servico: string;
}