import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedDataSubject = new BehaviorSubject<any>({});
  sharedData$ = this.sharedDataSubject.asObservable();

  updateSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }
}
