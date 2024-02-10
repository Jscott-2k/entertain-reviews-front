import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateReviewFormService } from '../../services/create-review-form.service';

@Component({
  selector: 'app-game-details-step',
  templateUrl: './game-details-step.component.html',
  styleUrls: ['./game-details-step.component.scss']
})
export class GameDetailsStepComponent {
  @Input() gameDetailsGroup!: FormGroup;
  
  /**
   * Update later with entries requested from igdb asynchronously 
   */
  private _gameAutoCompleteConfig: string[] = ["My First Game", "My Seconds Game", "My Thirds Game"];
  private _platformAutoCompleteConfig: string[] = ["My First Platform", "My Seconds Platform", "My Thirds Platform"];

  constructor(private formService: CreateReviewFormService) { }

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