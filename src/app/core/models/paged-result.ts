export interface PagedResult<T> {

  items: T[];

  pageIndex: number;

  pageSize: number;

  totalRecords: number;

  totalPages: number;

}
