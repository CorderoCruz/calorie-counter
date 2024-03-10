import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, OnInit, computed, inject } from "@angular/core";
import { WeightStore } from "../../store/weight/weight.store";

@Component({
  standalone: true,
  selector: `weight-tab`,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: `./weight-tab.component.html`,
  styles: ``,
})
export class WeightTabComponent implements OnInit {
  private weightStore = inject<WeightStore>(WeightStore);
  private weights = computed(() => this.weightStore.weightState());

  ngOnInit(): void {
    if (!this.weights().weights.length) {
      this.weightStore.getWeight();
    }
  }
}
