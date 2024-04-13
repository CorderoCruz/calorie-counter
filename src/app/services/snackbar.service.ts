import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class SnackbarService {
  private readonly snackBar = inject<MatSnackBar>(MatSnackBar);

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }
}
