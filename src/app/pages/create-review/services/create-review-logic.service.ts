import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, take } from 'rxjs';
import { CreateReviewFormConfig } from '../review-form/create-review-form-config';
import { CreateReviewFormService } from './create-review-form.service';


@Injectable({
  providedIn: 'root'
})
export class CreateReviewLogicService {

  private unweightedAverageValueSubject = new BehaviorSubject<number>(0);
  private weightedAverageValueSubject = new BehaviorSubject<number>(0);

  private overallWeightedScoreSubject = new BehaviorSubject<number>(0);
  private overallUnweightedScoreSubject = new BehaviorSubject<number>(0);

  private consModifierSubject = new BehaviorSubject<number>(0);
  private prosModifierSubject = new BehaviorSubject<number>(0);

  private technicalModifierSubject = new BehaviorSubject<number>(0);

  unweightedAverageValue$ = this.unweightedAverageValueSubject.asObservable();
  weightedAverageValue$ = this.weightedAverageValueSubject.asObservable();

  overallWeightedScore$ = this.overallWeightedScoreSubject.asObservable();
  overallUnweightedScore$ = this.overallUnweightedScoreSubject.asObservable();

  prosModifier$ = this.prosModifierSubject.asObservable();
  consModifier$ = this.consModifierSubject.asObservable();

  technicalModifier$ = this.technicalModifierSubject.asObservable();

  constructor(private formService:CreateReviewFormService) { }

  updateScores() {
    let technicalModiferControl = this.formService.technicalGroup.get("TechnicalReviewScoreModifier");
    let generalScoreGroup = this.formService.generalScoreGroup;
    let prosListControls = this.formService.prosControls;
    let consListControls = this.formService.consControls;
    this.updateGeneralScoreAverages(generalScoreGroup);
    this.updateProsModifier(prosListControls);
    this.updateConsModifier(consListControls);
    this.updateTechnicalModifier(technicalModiferControl?.value || 0);
    this.updateOverallScores();
  }

  updateTechnicalModifier(technicalModifier: number) {
    this.technicalModifierSubject.next(technicalModifier);
  }

  /**
   * Calculates the weighted average of scores based on importance weights.
   *
   * @returns {number} The calculated weighted average.
   */
  updateWeightedAverage(
    generalScoreGroup: FormGroup
  ): number {
    let totalValue = 0;
    let totalWeight = 0;

    CreateReviewFormConfig.weightControlNames.forEach((weightControlName, index) => {
      const weightValue = generalScoreGroup.get(weightControlName)?.value || 0;
      const correspondingScoreName = CreateReviewFormConfig.scoreControlNames[index];
      const scoreValue = generalScoreGroup.get(correspondingScoreName)?.value || 0;

      totalValue += scoreValue * weightValue;
      totalWeight += weightValue;
    });

    let weightedAverage = totalWeight > 0 ? totalValue / totalWeight : 0;
    weightedAverage = Number(weightedAverage.toFixed(2))
    this.weightedAverageValueSubject.next(weightedAverage);

    return weightedAverage;
  }

  updateUnweightedAverage(scoreControlNames: string[], generalScoreGroup: FormGroup): number {
    let totalValue = 0;
    let sliders = 0;

    scoreControlNames.forEach((controlName) => {
      const scoreValue = generalScoreGroup.get(controlName)?.value || 0;
      if (!controlName.includes('Importance')) {
        totalValue += scoreValue;
        sliders++;
      }
    });

    let unweightedAverage = sliders > 0 ? totalValue / sliders : 0;
    unweightedAverage = Number(unweightedAverage.toFixed(2));
    this.unweightedAverageValueSubject.next(unweightedAverage);

    return unweightedAverage;
  }

  updateOverallScores() {

    combineLatest([
      this.prosModifier$,
      this.consModifier$,
      this.technicalModifier$
    ]).pipe(
      take(1)
    ).subscribe(([prosModifier, consModifier, technicalModifier]) => {
      combineLatest([
        this.weightedAverageValue$,
        this.unweightedAverageValue$
      ]).pipe(
        take(1)
      ).subscribe(([weightedAverage, unweightedAverage]) => {
        this.updateOverallScore(true, weightedAverage, prosModifier, consModifier, technicalModifier);
        this.updateOverallScore(false, unweightedAverage, prosModifier, consModifier, technicalModifier);
      });
    });

  }

  updateOverallScore(
    isWeighted: boolean,
    averageScore: number,
    prosModifier: number,
    consModifier: number,
    technicalModifier: number
  ): number {
    const overall =
      averageScore +
      prosModifier +
      consModifier +
      technicalModifier;

    let overallScore = Number(overall.toFixed(2));
    if (isWeighted) {
      this.overallWeightedScoreSubject.next(overallScore)
    } else {
      this.overallUnweightedScoreSubject.next(overallScore);
    }

    return overallScore;
  }

  updateProsModifier(prosListControls: AbstractControl[]): number {
    const mod = prosListControls.reduce((sum, proControl) => {
      return sum + (proControl.get('modifier')?.value || 0);
    }, 0);
    this.prosModifierSubject.next(mod);
    return mod;
  }

  updateConsModifier(consListControls: AbstractControl[]): number {
    const mod = consListControls.reduce((sum, conControl) => {
      return sum + (conControl.get('modifier')?.value || 0);
    }, 0);
    this.consModifierSubject.next(mod);
    return mod;
  }

  updateGeneralScoreAverages(generalScoreGroup: FormGroup): { unweightedAverage: number; weightedAverage: number } {
    const unweightedAverageValue = this.updateUnweightedAverage(CreateReviewFormConfig.scoreControlNames, generalScoreGroup);
    const weightedAverageValue = this.updateWeightedAverage(generalScoreGroup);
    return { unweightedAverage: unweightedAverageValue, weightedAverage: weightedAverageValue };
  }

  get overallUnweighted(): number {
    return this.overallUnweightedScoreSubject.getValue();
  }
  get overallWeighted(): number {
    return this.overallWeightedScoreSubject.getValue();
  }
  get generalWeighted(): number {
    return this.weightedAverageValueSubject.getValue();
  }
  get generalUnweighted(): number {
    return this.unweightedAverageValueSubject.getValue();
  }
  get totalProsModifier(): number {
    return this.prosModifierSubject.getValue();
  }
  get totalConsModifier(): number {
    return this.consModifierSubject.getValue();
  }
}
