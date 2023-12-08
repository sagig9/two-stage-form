import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private toastr: ToastrService) { }
  
  formFieldMessages: { [key: string]: string } = {
    firstName: 'Fill First Name',
    lastName: 'Fill Last Name',
    email: 'Fill Valid Email Address',
    age: 'Fill Age Between 18 & 99',
    companyName: 'Fill Company Name',
    numberOfEmployees: 'Fill Non Negative Number',
    domain: 'Fill Valid Domain'
  };

  getFormFirstInvalidField(form: FormGroup) {
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        
        if (form.controls[controlName].invalid) {
          
          return controlName;
        }
      }
    }

    return '';
  }

  isFieldValid(form: FormGroup, fieldName: string) {
    return !form.controls[fieldName].invalid;
  }

  showValidationMessage(form: FormGroup) {
    const firstInvalidField = this.getFormFirstInvalidField(form);
    const firstInvalidFieldMsg = this.formFieldMessages[firstInvalidField];
    this.showWarningMessage(firstInvalidFieldMsg);
  }

  showWarningMessage(msg: string) {

    this.toastr.warning(msg, 'Form Validation', {
      positionClass: 'toast-bottom-right'
    });
  }
}
