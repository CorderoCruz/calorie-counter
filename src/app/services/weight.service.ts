import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({ providedIn: "root" })
export class WeightService {
  private http = inject<HttpClient>(HttpClient);

  getWeights() {
    return this.http.get("https://macro-api.up.railway.app/api/v1/weight");
  }
}
