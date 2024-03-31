import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class EmailValidatorService implements AsyncValidator {
  http: any;


  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;

    console.log("1",{ email });

    //! referencia de algo
    //*** Un ejemplo si tuvieramos un back para validar el email */
    /* return this.http.get(`http://midominio.com/users?q=${email}`)
            .pipe(
              map( resp => {
                return ( resp.length === 0) ? null : { emailTaken: 0 }
              })
            ) */

    //? Creando un observable para simular la petición http
    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log("2",{ email });
      // Indicamos si existe ya el correo le sale un error
      if( email === 'ale@mail.com') {
        subscriber.next( { emailTaken: true });
        subscriber.complete();
      }

      // Indicamos si no existe el correo no le mandamos errores
      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(3000)
    );

    return httpCallObservable;

  }

  /* validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;

    console.log({ email });

    return of({
      emailTaken: true
    }).pipe(
      delay( 2000 )
    )

  } */

  //! Este es opcional
  /* registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  } */



}
