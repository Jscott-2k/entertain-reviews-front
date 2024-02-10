import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.scss']
})
export class PreviewStepComponent {
  @Input() previewGroup!: FormGroup;
  constructor(){}
}
