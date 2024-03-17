import { Injectable, computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, pipe, tap } from "rxjs";
import { WeightService } from "../../services/weight.service";
import { Weight, WeightState } from "./weight.model";

const getWeightInitialState: WeightState = {
  weights: [],
  getWeightLoading: false,
  addWeightLoading: false,
  editWeightLoading: false,
  deleteWeightLoading: false,
  getWeightError: false,
  addWeightError: false,
  editWeightError: false,
  deleteWeightError: false,
};

@Injectable({ providedIn: "root" })
export class WeightStore {
  private readonly weightService = inject<WeightService>(WeightService);
  private readonly _state = signalState(getWeightInitialState);

  public weightState = computed(() => this._state());

  public getWeight = rxMethod<void>(
    pipe(
      tap(() => patchState(this._state, { getWeightLoading: true })),
      exhaustMap(() => {
        return this.weightService.getWeights().pipe(
          tapResponse({
            next: (weights: any) => patchState(this._state, { weights: weights as Weight[] }),
            error: (error: Error) => patchState(this._state, { getWeightError: { message: error.message } }),
            finalize: () => patchState(this._state, { getWeightLoading: false }),
          })
        );
      })
    )
  );

  public addWeight(weight: Weight) {
    return rxMethod<void>(
      pipe(
        tap(
          () => patchState(this._state, { addWeightLoading: true }),
          exhaustMap(() => {
            return this.weightService.addWeight(weight).pipe(
              tapResponse({
                next: (weight) => patchState(this._state, { weights: [...this._state.weights(), weight] }),
                error: (err: Error) => patchState(this._state, { addWeightError: { message: err.message } }),
                finalize: () => patchState(this._state, { addWeightLoading: false }),
              })
            );
          })
        )
      )
    );
  }

  public editWeight(date: string, newWeight: number) {
    return rxMethod<void>(tap());
  }
}
