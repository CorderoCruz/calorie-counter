import { Injectable, Injector, computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, pipe, tap } from "rxjs";
import { WeightService } from "../../services/weight.service";
import { Weight, WeightResponse, WeightState } from "./weight.model";
import { SnackbarService } from "../../services/snackbar.service";

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
  private readonly snackbarService = inject<SnackbarService>(SnackbarService);
  private readonly injector = inject<Injector>(Injector);
  private readonly _state = signalState(getWeightInitialState);

  public weightState = computed(() => this._state());

  public weights = computed(() => this.weightState().weights.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

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

  public addWeight = rxMethod<Weight>(
    pipe(
      tap(() => patchState(this._state, { addWeightLoading: true })),
      exhaustMap((weight: Weight) => {
        return this.weightService.addWeight(weight).pipe(
          tapResponse({
            next: (res: WeightResponse) =>
              patchState(this._state, { weights: [{ lbs: res.data.lbs, date: res.data.date }, ...this._state.weights()] }),
            error: (err: Error) => {
              patchState(this._state, { addWeightError: { message: err.message } || true });
              alert(err.message);
            },
            finalize: () => patchState(this._state, { addWeightLoading: false }),
          })
        );
      })
    ),
    { injector: this.injector }
  );

  public editWeight = rxMethod<{ date: string; newWeight: number }>(tap());

  public deleteWeight = rxMethod<{ date: string; index: number }>(
    pipe(
      tap(() => patchState(this._state, { deleteWeightLoading: true })),
      exhaustMap(({ date, index }) => {
        return this.weightService.deleteWeight(date).pipe(
          tapResponse({
            next: () => {
              const weights = this._state().weights;
              weights.splice(index, 1);
              patchState(this._state, { weights });
              this.snackbarService.openSnackBar("Successfully deleted weight", "Close");
            },
            error: (err: Error) => {
              patchState(this._state, { deleteWeightError: { message: err.message } });
              alert(err?.message);
            },
            finalize: () => patchState(this._state, { deleteWeightLoading: false }),
          })
        );
      })
    )
  );
}
