import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from 'src/app/core/models/pagination-request';
import { PagedResult } from 'src/app/core/models/paged-result';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `${environment.apiBaseUrl}/Project`;

  constructor(private http: HttpClient) {}

  // Get All Projects
  getProjects(request: PaginationRequest): Observable<PagedResult<Project>> {
    const params = new HttpParams()
      .set('pageIndex', request.pageIndex)
      .set('pageSize', request.pageSize)
      .set('search', request.search);

    return this.http.get<PagedResult<Project>>(
      `${this.apiUrl}/GetAllProjects`,
      { params }
    );
  }

  // Get Project By Id
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(
      `${this.apiUrl}/GetProjectById/${id}`
    );
  }

  // Create Project
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiUrl}/CreateProject`,
      project
    );
  }

  // Update Project
  updateProject(id: number, project: Project): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/UpdateProject/${id}`,
      project
    );
  }

  // Delete Project
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/DeleteProject/${id}`
    );
  }
}
