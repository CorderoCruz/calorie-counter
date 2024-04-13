import { Component } from "@angular/core";
import { WeightFormComponent } from "../weight-form/weight-form.component";
import { WeightListComponent } from "../weight-list/weight-list.component";

@Component({
  standalone: true,
  selector: `weight-container`,
  imports: [WeightFormComponent, WeightListComponent],
  template: `
    <weight-form></weight-form>
    <weight-list></weight-list>
  `,
  host: {
    class: "weight-tab-container mt-4 container",
  },
})
export class WeightComponent {}
