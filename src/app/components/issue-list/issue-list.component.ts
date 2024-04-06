import { Component } from '@angular/core';
import { Issue } from '../../issue.model';
import { IssueService } from '../../services/issue.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [FilterPipe, RouterModule, CommonModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent {
  issues: Issue[] = [];
  availableStatuses = ['Open', 'In Progress', 'Testing', 'Done'];
  fields = ['status', 'priority', 'assignee'];
  statusFilter: string = '';
  showStatusCell: boolean = true;
  showPriorityCell: boolean = true;
  showAssigneeCell: boolean = true;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.fetchIssues(); // fetch issues on init
  }

  fetchIssues() {
    // Call issueService to fetch issues
    this.issueService.getIssues().subscribe({
      next: (issues) => {
        // assign the fetched issues
        this.issues = issues;
      },
      error: (err) => {
        // handle error
        console.error(err);
      },
      complete: () => {},
    });
  }

  updateIssueStatus(issue: Issue, event: Event) {
    // 1. Update the issue in the UI (optimistically)
    // 2. Call issueService.updateIssueStatus(issue)
    // 3. Handle success/error, potentially revert the optimistic update

    const status = (event.target as HTMLSelectElement).value; // get the selected value
    const updatedIssue = { ...issue, status }; // create a new issue object with the updated status
    this.issueService.updateIssueStatus(updatedIssue).subscribe({
      next: (data) => {
        // update the issue in the UI
        issue.status = status;
        // other way to update the issue in the UI
        /* const index = this.issues.findIndex((i) => i.id === data.id);
        if (index !== -1) {
          this.issues[index] = data;
        }*/
      },
      error: (err) => {
        // handle error
        console.error(err);
      },
      complete: () => {},
    });
  }

  filterIssues(event: Event) {
    this.statusFilter = (event.target as HTMLSelectElement).value;
  }

  displayOptions(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case 'status':
        this.showStatusCell = true;
        this.showPriorityCell = false;
        this.showAssigneeCell = false;
        break;
      case 'priority':
        this.showStatusCell = false;
        this.showPriorityCell = true;
        this.showAssigneeCell = false;
        break;
      case 'assignee':
        this.showStatusCell = false;
        this.showPriorityCell = false;
        this.showAssigneeCell = true;
        break;
      default:
        this.showStatusCell = true;
        this.showPriorityCell = true;
        this.showAssigneeCell = true;
        break;
    }
  }
  issueDetails(issueId: number) {
    this.router.navigate(['/issue', issueId]);
  }
}
