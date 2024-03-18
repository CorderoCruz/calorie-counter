import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { WeightStore } from "../../store/weight/weight.store";
import { UtilsService } from "../../utils/utils.service";

@Component({
  standalone: true,
  selector: `weight-list`,
  imports: [CommonModule],
  templateUrl: `./weight-list.component.html`,
  styleUrl: `./weight-list.component.scss`,
})
export class WeightListComponent {
  private weightStore = inject<WeightStore>(WeightStore);
  private utils = inject<UtilsService>(UtilsService);

  public weights = computed(() => this.weightStore.weightState());

  public determineBg(index: number): string {
    return this.utils.determineBg(index);
  }
}
