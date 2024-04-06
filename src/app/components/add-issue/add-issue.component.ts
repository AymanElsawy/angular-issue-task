import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.scss',
})
export class AddIssueComponent {
  availableStatuses = ['Open', 'In Progress', 'Testing', 'Done'];
  availablePriorities = ['Low', 'Medium', 'High'];
  issueForm!: FormGroup;
  errorMessage: string = '';

  constructor(private issueService: IssueService, private router: Router) {}
  ngOnInit(): void {
    // init form
    this.formInit();
  }
  formInit() {
    this.issueForm = new FormGroup({
      title: new FormControl('', Validators.required),
      status: new FormControl('Open', Validators.required), // default value is 'Open'
      priority: new FormControl('Low', Validators.required), // default value is 'Low'
      assignee: new FormControl('', Validators.required),
    });
  }

  addIssue() {
    this.errorMessage = ''; // clear error message if any previous error
    //add issue
    const newIssue = this.issueForm.value; // get the form values
    this.issueService.addIssue(newIssue).subscribe({
      next: (data) => {
        // navigate to issue list
        this.router.navigate(['/']);
      },
      error: (err) => {
        // handle error
        this.errorMessage = err.message; // set error message
      },
      complete: () => {
        this.issueForm.reset(); // clear the form
      },
    });
  }
}
