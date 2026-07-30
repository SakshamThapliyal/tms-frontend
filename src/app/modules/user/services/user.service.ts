import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { PagedResult } from 'src/app/core/models/paged-result';

import { User } from '../models/user';
import { UserManagement } from '../models/user-management';
import { UserManagementRequest } from '../models/user-management-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/User`;

  constructor(private http: HttpClient) {}

  // Used by Task Module
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/GetAllUsers`);
  }

  // Used by Admin User Management
  getUsersForManagement(
    request: UserManagementRequest,
  ): Observable<PagedResult<UserManagement>> {
    const params = new HttpParams()
      .set('pageIndex', request.pageIndex)
      .set('pageSize', request.pageSize)
      .set('search', request.search ?? '');

    return this.http.get<PagedResult<UserManagement>>(
      `${this.apiUrl}/GetUsersForManagement`,
      {
        params,
      },
    );
  }
}
