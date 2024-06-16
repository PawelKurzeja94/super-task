import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export type FormControlModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type FormType<T> =
  | FormGroup<FormControlModel<T>>
  | AbstractControl<Partial<T>, T>;
