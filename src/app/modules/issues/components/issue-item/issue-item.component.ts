import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [RouterLink],
  templateUrl: './issue-item.component.html'
})
export class IssueItemComponent {

  issue = input.required<GitHubIssue>()
  issueService = inject(IssueService)

  get isOpen() {
    return this.issue().state === State.Open
  }

  prefetchData() {

    // this.issueService.prefetchIssue(this.issue().number.toString())
    this.issueService.setIssueData(this.issue())
  }

}
