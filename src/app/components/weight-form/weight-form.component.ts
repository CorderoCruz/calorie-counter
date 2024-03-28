import { AfterViewInit, Component, OnInit, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerControl, MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { UtilsService } from "../../utils/utils.service";
import { WeightService } from "../../services/weight.service";
import { WeightStore } from "../../store/weight/weight.store";
import { sign } from "crypto";

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
          <input matInput [matDatepicker]="picker" (dateChange)="dateChange($event)" formControlName="date" />
          <mat-datepicker-toggle matIconSuffix [for]="picker">
            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
          </mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-form-field class="example-full-width">
          <mat-label>Enter Weight for {{ formatedDate() }}</mat-label>
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
export class WeightFormComponent implements OnInit {
  private fb = inject<FormBuilder>(FormBuilder);
  public utils = inject<UtilsService>(UtilsService);
  private weightStore = inject<WeightStore>(WeightStore);

  public weightForm = this.fb.group({
    date: [new Date()],
    lbs: [[], [Validators.required]],
  });

  public dateChange(event: MatDatepickerInputEvent<{ target: any; targetElement: any; value: Date } | any>): void {
    this.formatedDate.set(this.utils.formatDate(event.value));
    console.log(this.formatedDate());
  }

  public formatedDate = signal<string>("");

  public addWeight(): void {
    let { date, lbs } = this.weightForm.getRawValue();
    if (!lbs) {
      return alert("No weight provided!");
    }
    if (date) {
      this.formatedDate.set(this.utils.formatDate(date));
    }
    this.weightStore.addWeight({ date: this.formatedDate(), lbs: lbs as number });
  }

  ngOnInit(): void {
    this.formatedDate.set(this.utils.getTodaysDate());
  }
}
