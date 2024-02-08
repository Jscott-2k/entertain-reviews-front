import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SliderConfig } from '../../interfaces/slider-config.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:  forwardRef(() => SliderComponent),
      multi: true
    },
  ],
})

export class SliderComponent implements ControlValueAccessor, OnInit {
  
  @Input() sliderConfig: SliderConfig = {
    minValue: 1,
    maxValue: 10,
    stepValue: .25
  };
  @Input() labelName:string = "Value";
  @Input() defaultValue:number = this.sliderConfig.minValue;
  private _value: number = this.defaultValue;
  
  private onChange: any = () => {};
  private onTouch: any = () => {};

  ngOnInit(): void {
    // if (this.sliderConfig) {
    //   this.writeValue(this.defaultValue);
    // }
  }

  get value(): number {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
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