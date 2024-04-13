import { Component, OnInit, computed, inject } from "@angular/core";
import { WeightState } from "../../store/weight/weight.model";
import { WeightStore } from "../../store/weight/weight.store";
import { WeightFormComponent } from "../weight-form/weight-form.component";
import { WeightListComponent } from "../weight-list/weight-list.component";
import { WeightComponent } from "../weight/weight.component";

@Component({
  standalone: true,
  selector: `weight-tab`,
  imports: [WeightListComponent, WeightFormComponent, WeightComponent],
  template: `<weight-container></weight-container> `,
})
export class WeightTabComponent implements OnInit {
  private weightStore = inject<WeightStore>(WeightStore);

  public weights = computed<WeightState>(() => this.weightStore.weightState());

  ngOnInit(): void {
    if (!this.weights().weights.length) {
      this.weightStore.getWeight();
    }
  }
}
