import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { NotCompletedComponent } from './pages/not-completed/not-completed.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UsersComponent } from './pages/users/users.component';
import { Page404Component } from './pages/page404/page404.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CardComponent,
    HomeComponent,
    CompletedComponent,
    NotCompletedComponent,
    LoginComponent,
    SignInComponent,
    UsersComponent,
    Page404Component,
    UserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
