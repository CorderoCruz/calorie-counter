import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { WeightStore } from "../../store/weight/weight.store";
import { UtilsService } from "../../utils/utils.service";

@Component({
  standalone: true,
  selector: `weight-list`,
  imports: [MatIconModule, CommonModule],
  templateUrl: `./weight-list.component.html`,
  styleUrl: `./weight-list.component.scss`,
})
export class WeightListComponent {
  constructor() {
    effect(() => {
      console.log(this.weights());
    });
  }
  private weightStore = inject<WeightStore>(WeightStore);
  private utils = inject<UtilsService>(UtilsService);

  public weightState = computed(() => this.weightStore.weightState());
  public weights = computed(() => this.weightStore.weights());

  public determineArrow(index: number): "up" | "down" | "same" {
    return this.utils.determineArrow(index);
  }

  public determineDifference(index: number): number {
    return this.utils.determineDifference(index);
  }

  public deleteWeight(date: string, index: number) {
    this.weightStore.deleteWeight({ date, index });
  }
}
