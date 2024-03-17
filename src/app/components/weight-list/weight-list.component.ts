import { Component, computed, inject } from "@angular/core";
import { WeightStore } from "../../store/weight/weight.store";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: `weight-list`,
  imports: [CommonModule],
  template: `
    <div class="weights-container mt-5 ">
      @defer (when weights().weights.length || weights().getWeightError;) {
      <div>
        @if (weights().weights.length) {
        <div>
          <div class="container pb-5">
            <div class="row">
              @for (weight of weights().weights; track $index) {
              <div class="col-12 col-md-6 col-xxl-3">
                <div class="d-flex align-items-center justify-content-center mt-3 shadow-lg p-3 bg-white rounded">
                  <div class="d-flex gap-2">
                    <h6 class="m-0">Weight for {{ weight.date }}:</h6>
                    <h6 class="m-0">{{ weight.lbs | number : ".2" }} lbs</h6>
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
        } @if (weights().getWeightError) {
        <div>Error</div>
        }
      </div>
      } @placeholder (minimum 1000;) {
      <span class="loader"></span>
      } @error() {
      <div>Unexpected Error happened!</div>
      }
    </div>
  `,
  styles: `.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }`,
})
export class WeightListComponent {
  private weightStore = inject<WeightStore>(WeightStore);

  public weights = computed(() => this.weightStore.weightState());
}
