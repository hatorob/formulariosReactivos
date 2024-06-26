import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { cantBeStrider, emailPattern } from '../../../shared/validators/validators.functions';
//! Podemos usar la importanciones así también
//import * as customValidators from '../../../shared/validators/validators.functions';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-pages.component.html',
  styles: ``
})
export class RegisterPagesComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    //email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ new EmailValidatorService() ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ this.emailValidator ]],
    userName: ['', [ Validators.required, this.validatorService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    confirmedPassword:  ['', [ Validators.required ]]
  }, {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password','confirmedPassword')
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {

  }

  isValidField( field: string ) {
    // TODO: Obtener validación desde un servicio
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubimit(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }



}
