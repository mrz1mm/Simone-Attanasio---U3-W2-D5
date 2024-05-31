import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CompletedComponent } from './pages/completed/completed.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotCompletedComponent } from './pages/not-completed/not-completed.component';
import { Page404Component } from './pages/page404/page404.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'completed', component: CompletedComponent },
  { path: 'not-completed', component: NotCompletedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: Page404Component },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
