import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonDetails } from '../models/person-details';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  isLocalHost = document.domain == "localhost";
  readonly APIUrl = this.isLocalHost ? "dev-url" : "prod-url";

  constructor(private http: HttpClient) { }

  sendForm(personDetails: PersonDetails) {
    //return this.http.post(this.APIUrl + '/TwoStepsForm/Send', personDetails);
    return true;;
  }
}
