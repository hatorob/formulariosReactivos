import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from '../../../shared/validators/validators.functions';

@Component({
  templateUrl: './register-pages.component.html',
  styles: ``
})
export class RegisterPagesComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required ]],
    userName: ['', [ Validators.required, cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    confirmedPassword:  ['', [ Validators.required ]]
  })

  constructor( private fb: FormBuilder ) {

  }

  isValidField() {
    // TODO: Obtener validación desde un servicio
  }

  onSubimit(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }



}
