import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CustomErrorStateMatcher, CustomValidators } from 'src/app/shared/custom.validation';
import { errorMessageMap } from 'src/app/shared/interfaces/error.interface';
import { SelectConfig } from 'src/app/shared/interfaces/select.interface';
import { SliderConfig } from 'src/app/shared/interfaces/slider-config.interface';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  
  generalScoreGroup!: FormGroup;
  writtenReviewGroup!: FormGroup;
  consentGroup!: FormGroup;
  gameDetailsGroup!: FormGroup;
  proConsGroup!: FormGroup;
  technicalGroup!: FormGroup;
  previewGroup!: FormGroup;
  submitGroup!:FormGroup;
  form!: FormGroup;
  
  readonly WrittenReviewWordCountRequired = 100;

  errorStateMatcher = new CustomErrorStateMatcher();

  sliderControlNames: string[] = [
    'GraphicsSlider',
    'GraphicsImportanceSlider',

    'GameplaySlider',
    'GameplayImportanceSlider',

    'StorySlider',
    'StoryImportanceSlider',

    'MusicSlider',
    'MusicImportanceSlider',

    'SFXSlider',
    'SFXImportanceSlider',

    'UIUXSlider',
    'UIUXImportanceSlider'
  ];
  
  controlNameLabelMapping: { [key: string]: string } = {
    GraphicsSlider: 'Graphics Score',
    GraphicsImportanceSlider: 'Graphics Importance (weight)',
    GameplaySlider: 'Gameplay Score',
    GameplayImportanceSlider: 'Gameplay Importance (weight)',
    StorySlider: 'Story Score',
    StoryImportanceSlider: 'Story Importance (weight)',
    MusicSlider: 'Music Score',
    MusicImportanceSlider: 'Music Importance (weight)',
    SFXSlider: 'SFX Score',
    SFXImportanceSlider: 'SFX Importance (weight)',
    UIUXSlider: 'UI/UX Score',
    UIUXImportanceSlider: 'UI/UX Importance (weight)'
  };

  weightedAverageValue: number = 0;
  unweightedAverageValue:number = 0;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.form.updateValueAndValidity();
    this.subscribeToSliderChanges();
    this.calculateAverageValues();

    console.log(this.writtenReviewGroup);
  }

  private buildForm(){
    this.writtenReviewGroup = this.buildWrittenReviewForm();
    this.generalScoreGroup = this.buildGeneralScoreForm();
    this.generalScoreGroup.setValidators(CustomValidators.atLeastOneImportanceSliderGreaterThanZero());

    this.previewGroup = this.buildPreviewForm();
    this.consentGroup = this.buildConsentForm();
    this.consentGroup.updateValueAndValidity();
    this.gameDetailsGroup = this.buildGameDetailsForm();
    this.gameDetailsGroup.updateValueAndValidity();

    this.technicalGroup = this.buildTechnicalForm();
    this.proConsGroup = this.buildProConsForm();
    this.submitGroup = this.buildSubmitForm();

    return this.formBuilder.group({
      consentGroup:this.consentGroup,
      gameDetailsGroup:this.gameDetailsGroup,
      writtenReviewGroup:this.writtenReviewGroup,
      generalScoreGroup:this.generalScoreGroup,
      proConsGroup:this.proConsGroup,
      technicalGroup:this.technicalGroup,
      previewGroup:this.previewGroup
    });
  }
  private buildSubmitForm(){
    return this.formBuilder.group({});
  }
  private buildConsentForm(){
    return this.formBuilder.group({
      ConsentCheckbox:[false,[Validators.requiredTrue]]
    });
  }
  private buildGameDetailsForm(){
    return this.formBuilder.group({
      GameSelect:['',Validators.required]
    });
  }
  private buildProConsForm(){
    return this.formBuilder.group({});
  }
  private buildTechnicalForm(){
    return this.formBuilder.group({});
  }
  private buildPreviewForm(){
    return this.formBuilder.group({});
  }
  private buildGeneralScoreForm(): FormGroup {
    const formGroupConfig = this.sliderControlNames
      .reduce((config, controlName) => {
        config[controlName] = [0];
        return config;
      }, {} as { [key: string]: any });

    return this.formBuilder.group(formGroupConfig);
  }

  private buildWrittenReviewForm(): FormGroup {
    return this.formBuilder.group({
      WrittenReview: ['', [Validators.required,
          Validators.maxLength(10000), CustomValidators.minWordCount(this.WrittenReviewWordCountRequired)]]
    });
  }

  getGeneralScoreSliderControl(name: string): FormControl {
    return this.generalScoreGroup.get(name) as FormControl;
  }

  private calculateWeightedAverage(): number {
    let totalValue = 0;
    let totalWeight = 0;
    this.sliderControlNames.forEach((controlName) => {
      if (controlName.includes('Importance')) {
        const importanceValue = this.generalScoreGroup.get(controlName)?.value || 0;
        const correspondingSliderName = controlName.replace('Importance', '');
        const scoreValue = this.generalScoreGroup.get(correspondingSliderName)?.value || 0;

        totalValue += scoreValue * importanceValue;

        totalWeight += importanceValue;
      }
    });
    const weightedAverage = totalWeight > 0 ? totalValue / totalWeight : 0;
    return Number(weightedAverage.toFixed(2));
  }
  private calculateUnweightedAverage(): number {
    let totalValue = 0;
    let sliders = 0;
    this.sliderControlNames.forEach((controlName) => {
      const scoreValue = this.generalScoreGroup.get(controlName)?.value || 0;
      if (!controlName.includes('Importance')) {
        totalValue += scoreValue;
        sliders++;
      }
    });
    const unweightedAverage = sliders > 0 ? totalValue / sliders : 0;
    return Number(unweightedAverage.toFixed(2));
  }

  private _gameSelectConfig:SelectConfig<number> = {
    options: [
    { value: 1, viewValue: "My First Game" },
    { value: 2, viewValue: "My Seconds Game" },
    { value: 3, viewValue: "My Thirds Game" }],
    search: true,
    multi: false
  };

  get gameSelectConfig():SelectConfig<number>{
    return this._gameSelectConfig;
  }
  calculateAverageValues() {
    this.unweightedAverageValue = this.calculateUnweightedAverage();
    this.weightedAverageValue = this.calculateWeightedAverage();
  }

  subscribeToSliderChanges(): void {
    this.sliderControlNames.forEach((controlName) => {
      const control = this.generalScoreGroup.get(controlName);
      if (control) {
        control.valueChanges.subscribe(() => {
          this.calculateAverageValues();
        });
      }
    });
  }


  getLabelName(controlName: string): string {
    return this.controlNameLabelMapping[controlName] || '';
  }

  getControl(group:FormGroup, controlName:string) {

   return group.get(controlName) as FormControl;
  }

  getError(group:FormGroup, controlName:string) {
    if (!controlName || !group) {
      return "No group or name provided";
    }
    const control = group.get(controlName);
  
    if (!control) {
      return `Control "${controlName}" not found in the form group`;
    }
    
    if (control.errors) {
      const errorKey = Object.keys(control.errors)[0] as keyof typeof errorMessageMap;
      if (errorKey) {
        const errorMessage = errorMessageMap[errorKey];
        return errorMessage(control);
      }
    }
  
    return "No error found";
  }
  isInvalid(group:FormGroup, controlName:string){
    if (group.get(controlName)?.invalid) {
      return true;
    }
    return false;
  }
}