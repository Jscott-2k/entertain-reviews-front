import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateReviewFormService } from '../../services/create-review-form.service';
import { FormStepComponent } from '../form-step/form-step.component';
import { getAllMockPlatforms } from 'src/app/shared/mock-platform-data';
import {
  AutoCompleteConfig,
  AutoCompleteOption,
} from 'src/app/shared/interfaces/auto-complete.interface';
import { PlatformService } from 'src/app/core/platform.service';

@Component({
  selector: 'app-game-details-step',
  templateUrl: './game-details-step.component.html',
  styleUrls: [
    './game-details-step.component.scss',
    '../../create-review.component.scss',
  ],
})
export class GameDetailsStepComponent
  extends FormStepComponent
  implements OnInit
{
  /**
   * Update later with entries requested from igdb asynchronously
   */
  private _gameAutoCompleteMap: Map<string, string> = new Map([
    ["My First Game", "My First Game"],
    ["My Second Game", "My Second Game"],
    ["My Third Game", "My Third Game"],
  ]);
  private _gameAutoCompleteConfig: AutoCompleteOption[] = Array.from(this._gameAutoCompleteMap.entries()).map(([value, completed]) => ({ value, completed }));
  
  private _platformAutoCompleteConfig: AutoCompleteOption[] = [];

  constructor(
    private formService: CreateReviewFormService,
    private platformService: PlatformService
  ) {
    super(formService);
  }
  ngOnInit(): void {
    this.platformService.fetchAllPlatforms().subscribe((platforms) => {
      this._platformAutoCompleteConfig = platforms.flatMap((platformObj) => {
        const platformName = platformObj.name ?? '???';
        const abbreviation = platformObj.abbreviation;
        const abbreviatedName = abbreviation
          ? `${platformName} (${abbreviation})`
          : platformName;
        return { completed: abbreviatedName, value: platformName };
      });
    });
  }

  private getGameAutoCompleteControl(): FormControl {
    return this.formService.gameDetailsGroup.get(
      'GameAutoComplete'
    ) as FormControl;
  }
  private getPlatformAutoCompleteControl(): FormControl {
    return this.formService.gameDetailsGroup.get(
      'PlatformAutoComplete'
    ) as FormControl;
  }
  get SelectedGameName(): string {
    //return this.getGameAutoCompleteControl()?.value;
    return this._gameAutoCompleteMap.get(this.getGameAutoCompleteControl()?.value) ?? "";
  }
  get SelectedPlatformName(): string {
    return this.getPlatformAutoCompleteControl()?.value;
  }

  get gameAutoCompleteConfig(): AutoCompleteOption[] {
    return this._gameAutoCompleteConfig;
  }

  get platformAutoCompleteConfig(): AutoCompleteOption[] {
    return this._platformAutoCompleteConfig;
  }
}
