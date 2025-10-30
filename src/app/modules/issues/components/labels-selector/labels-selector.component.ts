import { Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-labels.interfaces';

@Component({
  selector: 'issues-labels-selector',
  imports: [],
  templateUrl: './labels-selector.component.html'
})
export class LabelsSelectorComponent {

  labels = input.required<GitHubLabel[]>()

}
