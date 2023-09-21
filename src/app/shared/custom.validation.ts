import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ErrorPayload, ErrorType } from './interfaces/error.interface';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {

    static minWordCount(minWords: number): ValidatorFn {
        return (control: AbstractControl): ErrorPayload<ErrorType.minWords> | null => {
          const value = control.value;
          if (!value) {
            return null;
          }
          const words = value.trim().split(/\s+/).length;
          return words >= minWords ? null : {minWords: {requiredWords: minWords, actualWords: words}};
        };
      }

      static atLeastOneImportanceSliderGreaterThanZero(): ValidatorFn {
        return (abstractControl: AbstractControl): ErrorPayload<ErrorType.noImportanceSliders> | null => {

          let group = abstractControl as FormGroup;  
          let controls = Object.keys(group.getRawValue());
          const importanceSliders = controls.filter((controlName) =>
            controlName.includes('Importance')
          );
    
          const hasValueGreaterThanZero = importanceSliders.some(
            (controlName) => abstractControl.get(controlName)?.value > 0
          );
          return hasValueGreaterThanZero ? null : {noImportanceSliders: {noImportanceSliders: true}};
        };
      }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if(!control || !control.parent){
            return false;
        }
		return (control.parent.invalid && control.touched);
    }
}

