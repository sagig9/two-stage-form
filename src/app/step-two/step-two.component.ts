import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { PersonDetails } from '../models/person-details';
import { Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css'
})
export class StepTwoComponent implements OnInit {

  @ViewChild('msgModal') msgModal!: MessageModalComponent;
  form!: FormGroup;
  sharedData: any;

  constructor(private router: Router,
    private sharedDataService: SharedService,
    private fb: FormBuilder,
    private utilitiesService: UtilitiesService,
    private storageService: StorageService,
    private http: HttpService) {

    this.sharedDataService.sharedData$.subscribe((data) => {
      this.sharedData = data;
    });
  }

  ngOnInit() {
    
    this.initFormGroup();
    this.initFormProperties();
  }

  initFormGroup(): void {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      numberOfEmployees: ['', this.nonNegativeValidator],
      domain: ['', [Validators.required, this.domainValidator]]
    });
  }

  initFormProperties() {
    
    this.form.get('companyName')?.setValue(this.sharedData._personDetails.companyName);
    this.form.get('numberOfEmployees')?.setValue(this.sharedData._personDetails.numberOfEmployees);
    this.form.get('domain')?.setValue(this.sharedData._personDetails.domain);
  }
  
  domainValidator(control: AbstractControl): ValidationErrors | null {
    
    const domainPattern = /^([a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})(,[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})*$/;

    if (control.value && !domainPattern.test(control.value)) {
      return { invalidDomain: true };
    }

    return null;
  }

  nonNegativeValidator(control: AbstractControl): ValidationErrors | null {

    return (control.value < 0) ? { 'nonNegative': true } : null;
  }

  setFormDetails() {
    this.sharedData._personDetails.companyName = this.form.get('companyName')?.value;
    this.sharedData._personDetails.numberOfEmployees = this.form.get('numberOfEmployees')?.value;
  }

  openMessageModal() {
    this.msgModal.modalTitle = 'Registration Succeeded';
    this.msgModal.modalContent = JSON.stringify(this.sharedData._personDetails, null, 2);
    this.msgModal.show();
  }

  addDomain() {

    if (this.utilitiesService.isFieldValid(this.form, 'domain')) {
      this.sharedData._personDetails.domain.push(this.form.get('domain')?.value);
    }
    else {
      this.utilitiesService.showWarningMessage(this.utilitiesService.formFieldMessages['domain']);
    }
  }

  back() {
    this.setFormDetails();
    
    if (this.isSubmitSucceeded) {
      this.storageService.removeData("2-step-form");
    }
    else {
      this.storageService.saveData("2-step-form", JSON.stringify(this.sharedData._personDetails, null, 2)); // save data for back without submit
    }
    
    this.router.navigate(['/step-one']);
  }
  isSubmitSucceeded: boolean= false;

  submit() {

    if (this.form.valid) {
      this.setFormDetails();
      this.openMessageModal();
      this.isSubmitSucceeded = this.http.sendForm(this.sharedData._personDetails);
      this.storageService.removeData("2-step-form");
    } else {
      this.utilitiesService.showValidationMessage(this.form);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {

    this.setFormDetails();
    this.storageService.saveData("2-step-form", JSON.stringify(this.sharedData._personDetails, null, 2));
  }

}


