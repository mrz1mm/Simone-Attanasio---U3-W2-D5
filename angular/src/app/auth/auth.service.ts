import { HttpClient } from '@angular/common/http';
import { iUser } from './interfaces/i-user';
import { iAuthResponse } from './interfaces/i-auth-response';
import { iAuthData } from './interfaces/i-auth-data';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<null | iUser>(null);
  user$ = this.authSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin();
  }

  loginUrl: string = 'http://localhost:3002/login';
  registerUrl: string = 'http://localhost:3002/register';

  register(newUser: Partial<iUser>): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
  }

  login(authData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, authData).pipe(
      tap((data) => {
        this.authSubject.next(data.user);
        localStorage.setItem('accessToken', JSON.stringify(data));

        this.autoLogout();
      })
    );
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/auth/login']);
  }

  getAccessData(): iAuthResponse | null {
    const accessDataJson = localStorage.getItem('accessToken');

    if (!accessDataJson) return null;

    const accessData: iAuthResponse = JSON.parse(accessDataJson);
    return accessData;
  }

  autoLogin(): void {
    const accessData = this.getAccessData();

    if (!accessData) return;
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    const user = accessData.user;
    this.authSubject.next(user);
    this.autoLogout();
  }

  autoLogout(): void {
    const accessData = this.getAccessData();

    if (!accessData) return;

    const expDate = this.jwtHelper.getTokenExpirationDate(
      accessData.accessToken
    );
    const expMs = expDate?.getTime()! - new Date().getTime();
    setTimeout(this.logout, expMs);
  }

  isTokenValid(): boolean {
    const accessData = this.getAccessData();
    if (!accessData) return false;
    return !this.jwtHelper.isTokenExpired(accessData.accessToken);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }
}
