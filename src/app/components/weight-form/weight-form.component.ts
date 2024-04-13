import { Component, OnInit, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { WeightStore } from "../../store/weight/weight.store";
import { UtilsService } from "../../utils/utils.service";

@Component({
  standalone: true,
  selector: `weight-form`,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: `./weight-form.component.html`,
  styleUrl: `./weight-form.component.scss`,
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
