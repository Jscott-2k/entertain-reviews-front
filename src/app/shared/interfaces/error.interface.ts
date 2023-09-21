import { AbstractControl, Validators } from "@angular/forms";

export enum ErrorType {
    required = 'required',
    noImportanceSliders = 'noImportanceSliders',
    minWords = 'minWords',
    maxlength = 'maxlength',
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
};