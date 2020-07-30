export interface Pagination {
  pageNumber?: number;
  pageSize?: number;
}

export const PaginationDefault: Pagination = {
  pageNumber: 0,
  pageSize: 0
};