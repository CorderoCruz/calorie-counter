import { Component, OnInit, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { UtilsService } from "../../utils/utils.service";
import { WeightService } from "../../services/weight.service";
import { WeightStore } from "../../store/weight/weight.store";

@Component({
  standalone: true,
  selector: `weight-form`,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="weight-form-container">
      <form class="m-auto" [formGroup]="weightForm">
        <mat-form-field class="example-full-width">
          <mat-label>Choose a date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date" />
          <mat-datepicker-toggle matIconSuffix [for]="picker">
            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
          </mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-form-field class="example-full-width">
          <mat-label>{{ "Weight for " + dateSelected() }}</mat-label>
          <input matInput formControlName="lbs" />
          <mat-hint align="end">lbs.</mat-hint>
        </mat-form-field>
        <button class="mt-3 w-100" mat-raised-button (click)="addWeight()">Add weight</button>
      </form>
    </div>
  `,
  styles: `
  form {
    max-width: 375px;
  }

  mat-form-field {
    width: 100% !important;
  }`,
})
export class WeightFormComponent {
  private fb = inject<FormBuilder>(FormBuilder);
  private utils = inject<UtilsService>(UtilsService);
  private weightStore = inject<WeightStore>(WeightStore);

  public dateSelected = signal<string>(this.utils.formatDate(new Date(this.utils.getTodaysDate())));

  public weightForm = this.fb.group({
    date: [new Date(this.dateSelected())],
    lbs: [[], [Validators.required]],
  });

  public addWeight(): void {
    let { date, lbs } = this.weightForm.getRawValue();
    if (!lbs) {
      return alert("No weight provided!");
    }

    if (date) {
      this.dateSelected.set(this.utils.formatDate(date!));
    }

    console.log(this.dateSelected());
    this.weightStore.addWeight({ date: this.dateSelected(), lbs: lbs as number });
  }
}
