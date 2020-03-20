export class Pagination {
    pageNumber: number;
    pageSize: number;

    constructor(
        pageNumber: number = 0,
        pageSize: number = 0) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}