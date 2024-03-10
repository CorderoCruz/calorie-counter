import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideClientHydration } from "@angular/platform-browser";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideState, provideStore } from "@ngrx/store";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideEffects } from "@ngrx/effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()), provideClientHydration(), provideAnimationsAsync(), provideStore()],
};
