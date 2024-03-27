import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactiveModule ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }
];

//! importante, aquí me estaba dando el error de que no me servía reactiveFormsModule, ya que estaba usando directamente routing mdule y no module .ts
/*
const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive-routing.module').then( m => m.ReactiveRoutingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then( m => m.AuthRoutingModule),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }
];
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
