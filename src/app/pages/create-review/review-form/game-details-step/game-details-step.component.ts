import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { FormStepComponent } from '../form-step/form-step.component';

@Component({
  selector: 'app-game-details-step',
  templateUrl: './game-details-step.component.html',
  styleUrls: ['./game-details-step.component.scss']
})
export class GameDetailsStepComponent extends FormStepComponent {

  
  /**
   * Update later with entries requested from igdb asynchronously 
   */
  private _gameAutoCompleteConfig: string[] = ["My First Game", "My Seconds Game", "My Thirds Game"];
  private _platformAutoCompleteConfig: string[] = ["My First Platform", "My Seconds Platform", "My Thirds Platform"];

  constructor(private formService: CreateReviewFormService) {
    super(formService);
   }

  private getGameAutoCompleteControl(): FormControl {
    return this.formService.gameDetailsGroup.get("GameAutoComplete") as FormControl;
  }
  private getPlatformAutoCompleteControl(): FormControl {
    return this.formService.gameDetailsGroup.get("PlatformAutoComplete") as FormControl;
  }
  get SelectedGameName(): string {
    return this.getGameAutoCompleteControl()?.value;
  }
  get SelectedPlatformName(): string {
    return this.getPlatformAutoCompleteControl()?.value;
  }

  get gameAutoCompleteConfig(): string[] {
    return this._gameAutoCompleteConfig;
  }

  get platformAutoCompleteConfig(): string[] {
    return this._platformAutoCompleteConfig;
  }
}