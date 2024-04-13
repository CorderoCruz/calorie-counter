import { Component, afterNextRender, signal } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { OverviewTabComponent } from "../overview-tab/overview-tab.component";
import { WeeklyCaloriesTabComponent } from "../weekly-calories-tab/weekly-calories-tab.component";
import { WeightTabComponent } from "../weight-tab/weight-tab.component";

@Component({
  standalone: true,
  selector: `app-overview`,
  imports: [MatTabsModule, OverviewTabComponent, WeightTabComponent, WeeklyCaloriesTabComponent],
  templateUrl: `./overview.component.html`,
})
export class OverviewComponent {
  constructor() {
    afterNextRender(() => {
      this.selectedTab.set(+localStorage.getItem("selected-tab")!);
    });
  }

  public selectedTab = signal<number>(0);

  public selectedIndexChange(index: number): void {
    localStorage.setItem("selected-tab", index.toString());
  }
}
