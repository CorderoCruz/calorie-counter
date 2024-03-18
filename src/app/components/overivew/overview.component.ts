import { AfterViewInit, Component } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { OverviewTabComponent } from "../overview-tab/overview-tab.component";
import { WeeklyCaloriesTabComponent } from "../weekly-calories-tab/weekly-calories-tab.component";
import { WeightTabComponent } from "../weight-tab/weight-tab.component";

@Component({
  standalone: true,
  selector: `app-overview`,
  imports: [MatTabsModule, OverviewTabComponent, WeightTabComponent, WeeklyCaloriesTabComponent],
  template: `
    <div class="overview-container px-3 py-2 px-md-4">
      <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="center" mat-stretch-tabs="true">
        <mat-tab label="Overview">
          <overview-tab></overview-tab>
        </mat-tab>
        <mat-tab label="Weekly Calories">
          <ng-template matTabContent> <weekly-calories-tab></weekly-calories-tab></ng-template>
        </mat-tab>
        <mat-tab label="Weight">
          <ng-template matTabContent> <weight-tab> </weight-tab></ng-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class OverviewComponent {}
