import { inject } from '@angular/core';
import { IssueService } from './issue.service';
import { ResolveFn } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Issue } from '../issue.model';

export const detailsResolver: ResolveFn<true | Observable<Issue>> = (
  route,
  state
) => {
  const issueId = route.paramMap.get('id'); // get the issue id from the route
  // check if issue id exists
  if (issueId) {
    return inject(IssueService)
      .getIssueById(issueId) // get the issue
      .pipe( // pipe the observable
        map((data) => { // map the observable
          return data ; // return the issue
        }),
        catchError((err) => { // catch the error
          return of (err); // return the error
        })
      );
  }
  return true; // return true if issue id doesn't exist
};
