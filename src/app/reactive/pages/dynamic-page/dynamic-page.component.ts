import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  //! Me creo una función para no tener que hacer y copiar todas las validaciones en el html, si no que directamente con una función me lo haga
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  //! Validaciones para arreglos
  isValidFielInArray( formArray: FormArray, i: number ): boolean | null {
    return formArray.controls[i].errors && formArray.controls[i].touched;
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



  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([
      ["Metal Gear", Validators.required],
      ["Dragon ball Z", Validators.required],
      ["State of decay 2", Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl('',Validators.required);

  constructor( private fb: FormBuilder ){

  }

  onSubmit(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();

  }


  onDeleteFavorite( i: number ): void {
    this.favoriteGames.removeAt(i);
  }

  onAddToFavorites(): void {
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();

  }


}
