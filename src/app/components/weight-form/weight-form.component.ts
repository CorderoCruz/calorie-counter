import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { UtilsService } from "../../utils/utils.service";

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
          <mat-label>{{ "Weight for " + weightForm.getRawValue().date?.toLocaleDateString() }}</mat-label>
          <input matInput />
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
export class WeightFormComponent implements OnInit {
  private fb = inject<FormBuilder>(FormBuilder);
  private utils = inject<UtilsService>(UtilsService);

  public weightForm = this.fb.group({
    date: [new Date(this.utils.getTodaysDate())!, []],
    lbs: [0, []],
  });

  public addWeight(): void {
    let { date, lbs } = this.weightForm.getRawValue();
    const dateSelected = this.utils.formatDate(date!);
    console.log(dateSelected);
  }

  ngOnInit(): void {}
}
