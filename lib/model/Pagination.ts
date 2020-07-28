export class Pagination {
  pageNumber: number;
  pageSize: number;

  constructor(pageNumber = 0, pageSize = 0) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
