import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  //prime pagine visibili
  {path:'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path:'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)},

  {path:'museo', children: [
      {path:'articoli', loadChildren: () => import('./features/articoli/articoli.module').then(m => m.ArticoliModule)}
    ]
  },

  //pagine di errore e login non fatta
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
