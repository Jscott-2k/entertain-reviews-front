import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pros-cons-step',
  templateUrl: './pros-cons-step.component.html',
  styleUrls: ['./pros-cons-step.component.scss']
})
export class ProsConsStepComponent {
  @Input() prosConsGroup!: FormGroup;
  constructor(){}
}
