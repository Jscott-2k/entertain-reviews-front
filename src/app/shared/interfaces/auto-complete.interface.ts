import { FormControl } from "@angular/forms";

export interface AutoCompleteOption{
  completed:string, value:string
}
export interface AutoCompleteConfig{
  options:AutoCompleteOption[];
}