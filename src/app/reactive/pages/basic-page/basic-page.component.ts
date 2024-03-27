import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  //! Simulemos un producto que venga del backend y lo cargamos en nuestro formulario de forma inicial con OnInit

  public RTX5090 = {
    name: "RTX 5090",
    price: 2500,
    inStorage: 5
  }

  /* public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }); */


  public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.min(0) ] ],
    inStorage: [0, [ Validators.min(0)] ],
  })

  constructor( private fb: FormBuilder ){

  }

  ngOnInit(): void {
    //this.myForm.reset( this.RTX5090 )
  }

  //! Me creo una función para no tener que hacer y copiar todas las validaciones en el html, si no que directamente con una función me lo haga
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const error of Object.keys(errors)) {
      switch(error) {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Este campo es mínimo de ${ errors['minlength'].requiredLength} caracteres`;
        default:
          return null
      }
    }
    return null;
  }

  onSave():void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    //! resetear el formulario

    this.myForm.reset({ price: 0, inStorage: 0 });

  }

}
