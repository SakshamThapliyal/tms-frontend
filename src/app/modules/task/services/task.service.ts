import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { PagedResult } from 'src/app/core/models/paged-result';

import { Task } from '../models/task';
import { TaskSummary } from '../models/task-summary';
import { CreateTask } from '../models/create-task';
import { UpdateTask } from '../models/update-task';
import { TaskPaginationRequest } from '../models/task-pagination-request';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private appUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Task Summary (Search + Filters + Pagination)
  getTasks(
    request: TaskPaginationRequest,
  ): Observable<PagedResult<TaskSummary>> {
    let params = new HttpParams()
      .set('pageIndex', request.pageIndex)
      .set('pageSize', request.pageSize);

    if (request.search) {
      params = params.set('search', request.search);
    }

    if (request.status) {
      params = params.set('status', request.status);
    }

    if (request.projectId) {
      params = params.set('projectId', request.projectId);
    }

    if (request.assignedToUserId) {
      params = params.set('assignedToUserId', request.assignedToUserId);
    }

    return this.http.get<PagedResult<TaskSummary>>(
      `${this.appUrl}/Task/GetAllTasks`,
      {
        params,
      },
    );
  }

  // Get Task By Id
  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.appUrl}/Task/GetTaskById/${taskId}`);
  }

  // Create Task
  createTask(request: CreateTask): Observable<Task> {
    return this.http.post<Task>(`${this.appUrl}/Task/CreateTask`, request);
  }

  // Update Task
  updateTask(taskId: number, request: UpdateTask): Observable<void> {
    return this.http.put<void>(
      `${this.appUrl}/Task/UpdateTask/${taskId}`,
      request,
    );
  }

  // Delete Task
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}/Task/DeleteTask/${taskId}`);
  }
}
