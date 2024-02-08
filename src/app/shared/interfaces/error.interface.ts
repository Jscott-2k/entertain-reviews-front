import { AbstractControl, Validators } from "@angular/forms";

export enum ErrorType {
    required = 'required',
    noImportanceSliders = 'noImportanceSliders',
    minWords = 'minWords',
    maxlength = 'maxlength',
    invalidOverallScore = 'invalidOverallScore'
  }
  
export type ErrorPayload<T extends ErrorType> = 
T extends keyof ErrorPayloadMap 
? { [K in T]: ErrorPayloadMap[K] }
: never;

interface ErrorPayloadMap {
  [ErrorType.required]: { required: true };
  [ErrorType.noImportanceSliders]: { noImportanceSliders: true };
  [ErrorType.minWords]: { requiredWords: number; actualWords: number };
  [ErrorType.maxlength]: { requiredLength: number; actualLength: number };
  [ErrorType.invalidOverallScore]: { weightedScore: number, unweightedScore: number, lowerBound:number, upperBound:number};
}

export const errorMessageMap: {[key in ErrorType]:(control: AbstractControl) => string} =
{
  [ErrorType.required]: () => "You must enter a value",
  [ErrorType.noImportanceSliders]: () => "You must assign at least one importance slider with a value greater than zero.",
  [ErrorType.minWords]: (control: AbstractControl) => {
    const requiredWords = control.getError('minWords')?.requiredWords;
    return `You must enter at least ${requiredWords} words.`;
  },
  [ErrorType.maxlength]: (control: AbstractControl) => {
    const error = control.getError('maxlength');
    return `Character count exceeded by ${error.actualLength - error.requiredLength} characters.`;
  },
  [ErrorType.invalidOverallScore] :(control: AbstractControl) => {
    const error = control.getError('invalidOverallScore');
    const weightedScore = error?.weightedScore;
    const unweightedScore = error?.unweightedScore;
    const lowerBound = error?.lowerBound;
    const upperBound = error?.upperBound;
    
    if (!weightedScore || !unweightedScore || !lowerBound || !upperBound) {
      return 'Invalid overall score or bound';
    }
    
    if (weightedScore < lowerBound || weightedScore > upperBound) {
      if (unweightedScore < lowerBound || unweightedScore > upperBound) {
        return `Both scores must be between ${lowerBound} and ${upperBound}.`;
      }
      return `Weighted score must be between ${lowerBound} and ${upperBound}.`;
    }
    if (unweightedScore < lowerBound || unweightedScore > upperBound) {
      return `Unweighted score must be between ${lowerBound} and ${upperBound}.`;
    }
    return `Invalid overall scores: Weighted: ${weightedScore}, Unweighted: ${unweightedScore}.`;
  }, 
};