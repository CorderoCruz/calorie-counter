import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UtilsService {
  getTodaysDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: number | string = today.getMonth() + 1; // Months start at 0!
    let dd: number | string = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return mm + "-" + dd + "-" + yyyy;
  }

  public formatDate(date: Date) {
    return `${date?.getMonth()}-${date?.getDate()}-${date?.getFullYear()}`;
  }
}
