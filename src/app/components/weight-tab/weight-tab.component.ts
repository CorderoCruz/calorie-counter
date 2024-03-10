import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, OnInit, computed, inject } from "@angular/core";
import { WeightStore } from "../../store/weight/weight.store";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: `weight-tab`,
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: `./weight-tab.component.html`,
  styleUrl: `./weight-tab.component.scss`,
})
export class WeightTabComponent implements OnInit {
  private weightStore = inject<WeightStore>(WeightStore);
  public weights = computed(() => this.weightStore.weightState());
  private fb = inject<FormBuilder>(FormBuilder);

  public weightForm = this.fb.group({
    date: [],
    weight: [],
  });

  public addWeight() {
    console.log(this.weightForm.getRawValue());
  }

  ngOnInit(): void {
    if (!this.weights().weights.length) {
      this.weightStore.getWeight();
    }
  }
}
