import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardFormType, CardValue } from './models/card-types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CardComponent,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CardComponent implements ControlValueAccessor {
  @Input('formType') set formType(type: CardFormType) {
    this._formType = type;
    this.resolveFormType(type);
  }

  _formType!: CardFormType;
  get formType(): CardFormType {
    return this._formType;
  }

  form!: FormGroup<any>;

  onChange = (data: CardValue) => {};
  onTouched = () => {};
  writeValue = (formValue: CardValue) => {
    this.form.patchValue(formValue);
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  constructor(private fb: FormBuilder, private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: CardValue) => {
        this.onChange(data);
      });
  }

  resolveFormType(type: CardFormType) {
    switch (type) {
      case 'One':
        this.form = this.fb.group({
          type,
          name: '',
          inp1: '',
          inp2: '',
        });
        break;
      case 'Two':
        this.form = this.fb.group({
          type,
          name: '',
          inp7: '',
        });
        break;
      case 'Three':
        this.form = this.fb.group({
          type,
          name: '',
          inp3: '',
        });
        break;
      default:
        break;
    }
  }
}
