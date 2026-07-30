import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private appUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Dashboard Summarys
  getDashboard(projectId: number): Observable<Dashboard> {
    return this.http.get<Dashboard>(
      `${this.appUrl}/Dashboard/GetDashboard?projectId=${projectId}`,
    );
  }
}
