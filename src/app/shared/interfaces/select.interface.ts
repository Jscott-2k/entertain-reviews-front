import { FormControl } from "@angular/forms";
export interface SelectConfig<T> {
  options:SelectOption<T>[],
  search:boolean,
  multi:boolean,
  defaultValues?:T[]
}

export interface SelectOption<T> {
  value: T;
  viewValue: string;
}

export interface SelectedValues<T> {
  selected: T[];
}