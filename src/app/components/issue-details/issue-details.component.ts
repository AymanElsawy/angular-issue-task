import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss',
})
export class IssueDetailsComponent {
  issue!: Issue; // issue to display on the page (coming from route data) it will not be undefined
  errorMessage!: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // fetch issue on init
    this.route.data.subscribe({
      next: (data) => {
        console.log(data);
        if (data['issue']['error']) {
          this.errorMessage = data['issue']['error'];
          this.issue = {} as Issue;
        } else {
          this.issue = data['issue'];
        }
      },
    });
  }
}
