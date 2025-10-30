import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces';

@Component({
  selector: 'issue-item',
  imports: [RouterLink],
  templateUrl: './issue-item.component.html'
})
export class IssueItemComponent {

  issue = input.required<GitHubIssue>()

  get isOpen() {
    return this.issue().state === State.Open
  }

}
