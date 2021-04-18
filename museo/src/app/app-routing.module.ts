import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  //prime pagine visibili
  {path:'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},

  {path:'login',children:[
    {path:'admin', loadChildren: () => import('./features/login-admin/login-admin.module').then(m => m.LoginAdminModule)},
    {path:'user', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)},
  ]},

  {path:'museo', children: [
      {path:'articoli', loadChildren: () => import('./features/articoli/articoli.module').then(m => m.ArticoliModule)},
      {path:'articoli/preferiti', loadChildren: () => import('./features/preferiti/preferiti.module').then(m => m.PreferitiModule)},
      {path:'dettaglio/articolo/:id', loadChildren: () =>import('./features/dettaglio-articolo/dettaglio-articolo.module').then(m => m.DettaglioArticoloModule)}
    ]
  },

  //pagine di errore e login non fatta
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'cards', loadChildren: () => import('./features/cards/cards.module').then(m => m.CardsModule) },
  

  
  
  { path: '**', loadChildren: () => import('./features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
