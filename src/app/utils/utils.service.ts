import { Injectable, computed, inject } from "@angular/core";
import { WeightStore } from "../store/weight/weight.store";
import { WeightState } from "../store/weight/weight.model";

@Injectable({ providedIn: "root" })
export class UtilsService {
  private weightStore = inject<WeightStore>(WeightStore);
  private weights = computed<WeightState>(() => this.weightStore.weightState());

  getTodaysDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: number | string = today.getMonth() + 1; // Months start at 0!
    let dd: number | string = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return mm + "-" + dd + "-" + yyyy;
  }

  public formatDate(date: Date) {
    return `${date?.getMonth() + 1}-${date?.getDate()}-${date?.getFullYear()}`;
  }

  public determineBg(index: number): string {
    if (index + 1 !== this.weights().weights.length) {
      return this.weights().weights[index].lbs > this.weights().weights[index + 1].lbs
        ? "border-danger"
        : this.weights().weights[index].lbs === this.weights().weights[index + 1].lbs
        ? "border-warning"
        : "border-success";
    }
    return "";
  }
}
