import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-consent-step',
  templateUrl: './consent-step.component.html',
})
export class ConsentStepComponent {
  @Input() consentGroup!: FormGroup;
  constructor(){}
}