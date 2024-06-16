import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';
import { CardFormType, CardValue } from '../card/models/card-types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  form!: FormGroup;

  formArrayKey = 'typeGroups';

  constructor(private fb: FormBuilder, private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.form = this.fb.group({
      [this.formArrayKey]: this.fb.array([]),
    });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        const toLog = data.typeGroups.filter((el: any) => !!el.length);
        console.log(JSON.stringify(toLog));
      });
  }

  get formTypesArray(): FormArray {
    return this.form.get(this.formArrayKey) as FormArray;
  }

  addFormControl() {
    const control = this.fb.control('');
    this.formTypesArray.push(control);
  }

  removeFormControl(index: number) {
    this.formTypesArray.removeAt(index);
  }

  addNewType(type: CardFormType) {
    const control = this.fb.array([this.getNewControlGroup(type)]);
    this.formTypesArray.push(control);
  }

  getNewControlGroup(type: CardFormType): FormControl | null {
    if (type === 'One') {
      return this.fb.control({
        type,
        name: '',
        inp1: '',
        inp2: '',
      });
    }

    if (type === 'Two') {
      return this.fb.control({
        type,
        name: '',
        inp7: '',
      });
    }

    if (type === 'Three') {
      return this.fb.control({
        type,
        name: '',
        inp3: '',
      });
    }

    return null;
  }

  getFormArrayByIndex(index: number) {
    return this.formTypesArray.at(index) as FormArray;
  }

  drop(event: CdkDragDrop<any>, targetIndex: number) {
    const previousFormArray = this.getFormArrayByIndex(
      Number(event.previousContainer.id.replace('cdk-drop-list-', ''))
    );
    const currentFormArray = this.getFormArrayByIndex(targetIndex);

    const draggedItem = previousFormArray.at(
      event.previousIndex
    ) as FormControl<CardValue>;

    const sameItemTypeIndex = currentFormArray.value.findIndex(
      (data: CardValue) => {
        return data.type === draggedItem.value.type;
      }
    );

    if (sameItemTypeIndex === 0) {
      return;
    }

    previousFormArray.removeAt(event.previousIndex);

    this.getFormArrayByIndex(targetIndex).insert(
      event.currentIndex,
      draggedItem
    );
  }
}
