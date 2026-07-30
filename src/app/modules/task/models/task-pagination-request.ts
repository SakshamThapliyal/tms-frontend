import { PaginationRequest } from 'src/app/core/models/pagination-request';

export interface TaskPaginationRequest extends PaginationRequest {
  status?: string;

  projectId?: number;

  assignedToUserId?: number;
}
