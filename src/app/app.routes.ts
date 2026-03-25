import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found/page-not-found';
import { Error } from './page-error/error';
import { Home } from './home/home';
// import { Callout } from './docs-plugin/callout/callout';

export const routes: Routes = [
  {
    path: 'home',
    title: "tutorial-home",
    component: Home,
    pathMatch: 'full'
  },
  // {
  //   path: "plugin-01",
  //   title: "callout-plugin-01",
  //   component: Callout
  // },
  {
    path: "fallback",
    title: "Page Not Found",
    component: PageNotFound
  },
  {
    path: 'error',
    title: 'Error on Page',
    component: Error
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },
  {
    path: '**',
    redirectTo: "fallback"
  }
];
