import { Routes } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { detailsResolver } from './services/details.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IssueListComponent,
  },
  {
    path: 'add-issue',
    loadComponent: () => import('./components/add-issue/add-issue.component').then((m) => m.AddIssueComponent),
  },
  {
    path: 'issue/:id',
    loadComponent: () => import('./components/issue-details/issue-details.component').then((m) => m.IssueDetailsComponent),
    resolve: {
      issue: detailsResolver
    }
  }
];
