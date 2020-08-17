export interface EntityList<T> {
  totalPages: number;
  totalElements: number;
  contents: T[];
}
