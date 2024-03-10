import { Injectable, computed, inject } from "@angular/core";
import { patchState, signalState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { WeightService } from "../../services/weight.service";
import { WeightState } from "./weight.model";
import { exhaustMap, pipe, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { Weight } from "./weight.model";

const initialState: WeightState = {
  weights: [],
  loading: false,
  error: false,
};

@Injectable({ providedIn: "root" })
export class WeightStore {
  private readonly weightService = inject<WeightService>(WeightService);
  private readonly _state = signalState(initialState);

  public weightState = computed(() => this._state());

  public getWeight = rxMethod<void>(
    pipe(
      tap(() => patchState(this._state, { loading: true })),
      exhaustMap(() => {
        return this.weightService.getWeights().pipe(
          tapResponse({
            next: (weights: any) => patchState(this._state, { weights: weights as Weight[] }),
            error: (error: Error) => patchState(this._state, { error: { message: error.message } }),
            finalize: () => patchState(this._state, { loading: false }),
          })
        );
      })
    )
  );
}
