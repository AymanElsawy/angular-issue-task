import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../issue.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/issues';
  statusFilterKey: BehaviorSubject<{ key: string; issue?: Issue }> =
    new BehaviorSubject<{ key: string; issue?: Issue }>({ key: '' });

  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  updateIssueStatus(issue: Issue): Observable<any> {
    // Implement the API call to update the issue status.
    return this.http.patch<any>(`${this.apiUrl}/${issue.id}`, {
      status: issue.status,
    });
  }

  addIssue(issue: Issue) {
    return this.http.post(this.apiUrl, issue);
  }

  getIssueById(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }
}
