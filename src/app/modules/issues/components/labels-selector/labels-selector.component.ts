import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-labels.interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [],
  templateUrl: './labels-selector.component.html'
})
export class LabelsSelectorComponent {

  labels = input.required<GitHubLabel[]>()

  issuesService = inject(IssuesService)

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName)
  }

  onToggleLabel(labelName: string) {
    this.issuesService.toggleLabel(labelName)
  }

}
