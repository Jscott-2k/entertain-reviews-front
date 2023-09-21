import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectConfig, SelectOption } from '../../interfaces/select.interface';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
  ],
})
export class SelectComponent<T = string> implements ControlValueAccessor, OnInit {

  @Input() selectConfig: SelectConfig<T> = {
    options: [],
    search: false,
    multi: false,
    defaultValues: []
  };
  @Input() labelName: string = "";

  searchTerm: string = '';
  private _defaultValues?: T[] = this.selectConfig?.defaultValues;
  private _selectedValues: T[] = [];
  filteredOptions: SelectOption<T>[] = [];

  private onChange: any = () => { };
  private onTouch: any = () => { };

  get values():T[]{
    return this._selectedValues;
  }
  removeValue(value: T) {
    const index = this._selectedValues.indexOf(value);
    if (index !== -1) {
      this._selectedValues.splice(index, 1);
      this.onChange(this._selectedValues);
    }
  }
  ngOnInit(): void {
    if (this._defaultValues) {
      this._selectedValues = this._defaultValues.slice();
    }
  }
  onSearchInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filteredOptions = this.selectConfig.options.filter((option) =>
      option.viewValue.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  onSelectionChange(event: MatSelectChange) {

    this._selectedValues =  event.source.selected
    ? (this.selectConfig.multi
        ? event.source.value as T[]
        : [event.source.value as T]
      )
    : (this.selectConfig.multi
        ? this._selectedValues.filter(val => val !== event.source.value)
        : []
      );
    this.onChange(this._selectedValues);
  }

  writeValue(values: any): void {
    if (Array.isArray(values)) {
      this._selectedValues = values;
    } else {
      this._selectedValues = [values];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
