import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { Weight } from "../store/weight/weight.model";

@Injectable({ providedIn: "root" })
export class WeightService {
  private http = inject<HttpClient>(HttpClient);
  private readonly API_URL: string = "https://macro-api.up.railway.app/api/v1/weight";

  public getWeights(): Observable<Weight[]> {
    return this.http.get(this.API_URL) as Observable<Weight[]>;
  }

  public addWeight(weight: Weight): Observable<Weight> {
    return this.http.post(this.API_URL, weight) as Observable<Weight>;
  }
}
