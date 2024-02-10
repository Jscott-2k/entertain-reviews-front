import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'], providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = "";
  @Input() defaultCheck!: boolean;
  @Input() disabled: boolean = false;

  private _checked: boolean = this.defaultCheck;

  onChange: any = () => { };
  onTouch: any = () => { };

  ngOnInit(): void {
    if (this.defaultCheck) {
      this.writeValue(this.defaultCheck);
    }
  }

  get value(): boolean {
    return this._checked;
  }

  set value(val: boolean) {
    this._checked = val;
    this.onChange(val);
    this.onTouch(val);
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.value = value;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
