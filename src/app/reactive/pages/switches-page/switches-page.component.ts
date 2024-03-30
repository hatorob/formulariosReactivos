import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: [ 'M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndContidions: [ false, Validators.requiredTrue ]
  })

  public person = {
    gender: 'F',
    wantNotifications: true
  };

    //! Me creo una función para no tener que hacer y copiar todas las validaciones en el html, si no que directamente con una función me lo haga
    isValidField( field: string ): boolean | null {
      return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
    }


  constructor( private fb: FormBuilder ) {

  }
  ngOnInit(): void {
    this.myForm.reset( this.person );
  }


  onSubimit(): void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };

    const { termsAndContidions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

  }

}
