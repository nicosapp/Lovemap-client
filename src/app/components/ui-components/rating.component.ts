import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  template: `
    <div>
      <ion-icon
        name="star"
        *ngFor="let num of [1, 2, 3, 4, 5]"
        (click)="rate(num)"
        [color]="getColor(num)"
        size="large"
      ></ion-icon>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RatingComponent)
    }
  ]
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  private disabled: boolean = false;

  constructor() {}
  writeValue(index: number): void {
    console.log(index);
    this.rating = index;
  }
  onChanged = (_) => {};
  onTouched = () => {};
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    this.onChanged(this.rating);
  }
  isAboveRating(index: number): boolean {
    return index > this.rating;
  }
  getColor(index: number) {
    if (this.isAboveRating(index)) return 'light';
    else return 'primary';
  }
}
