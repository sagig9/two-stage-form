import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonDetails } from '../models/person-details';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})

export class StepOneComponent implements OnInit {

  form!: FormGroup;
  personDetailsObject!: PersonDetails;

  constructor(private router: Router,
    private sharedDataService: SharedService,
    private fb: FormBuilder,
    private utilitiesService: UtilitiesService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.initFormGroup();
    this.initLocalStorageValues();
  }

  initLocalStorageValues() {
    const formJsonString = this.storageService.getData("2-step-form");

    if (!!formJsonString) {

      this.personDetailsObject = JSON.parse(formJsonString);
      this.form.get('firstName')?.setValue(this.personDetailsObject.firstName);
      this.form.get('lastName')?.setValue(this.personDetailsObject.lastName);
      this.form.get('email')?.setValue(this.personDetailsObject.email);
      this.form.get('age')?.setValue(this.personDetailsObject.age);
    }
  }

  initFormGroup(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]]
    });
  }

  next() {
    if (this.form.valid) {

      let personDetails: PersonDetails = this.setFormDetails();
      this.sharedDataService.updateSharedData({ ...this.sharedDataService.sharedData$, _personDetails: personDetails });
      this.storageService.saveData("2-step-form", JSON.stringify(personDetails, null, 2));
      this.router.navigate(['/step-two']);
      //this.router.navigate(['/step-two'], { state: { fromStepOne: true } });
    } else {

      this.utilitiesService.showValidationMessage(this.form);
    }
  }

  setFormDetails(): PersonDetails {

    let personDetails: PersonDetails = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      age: this.form.get('age')?.value,
      companyName: this.personDetailsObject ? this.personDetailsObject.companyName : '',
      numberOfEmployees: this.personDetailsObject ? this.personDetailsObject.numberOfEmployees :0,
      domain: this.personDetailsObject ? this.personDetailsObject.domain : []
    };
    
    return personDetails;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {

    let personDetails: PersonDetails = this.setFormDetails();
    this.storageService.saveData("2-step-form", JSON.stringify(personDetails, null, 2));
  }
}


