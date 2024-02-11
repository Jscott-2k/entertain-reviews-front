import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { SliderComponent } from '../slider/slider.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AutoCompleteConfig, AutoCompleteOption } from '../../interfaces/auto-complete.interface';
@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:  forwardRef(() => AutoCompleteComponent),
      multi: true
    },
  ],
})
export class AutoCompleteComponent implements OnInit, ControlValueAccessor{


  @Input() options: AutoCompleteOption[] = []
  @Input() labelName:string = "label name";
  @Input() placeholder:string = "placeholder";

  userInput: string = '';
  filteredOptions: AutoCompleteOption[] = [];
  selectedOption:string = '';
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  private filterOptions(input: string): AutoCompleteOption[] {
    const filterValue = input.toLowerCase();
    // If input is empty, return all options
    if (filterValue === '') {
      return this.options;
    }
    return this.options.filter(option => option.completed.toLowerCase().includes(filterValue));
  }

  onInput(event: any): void {
    const inputValue = event.target.value; // Extract the value from the input event
    this.filteredOptions = this.filterOptions(inputValue);

  }

  onOptionSelected(event:MatAutocompleteSelectedEvent): void {
    this.userInput = event.option.value;
    this.selectedOption = this.userInput;
    this.onChange(this.userInput);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.userInput = value;
    this.filteredOptions = this.filterOptions(value);
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }
}
