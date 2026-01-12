import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {
    const user = this.storage.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/auth/register/`,
      data
    );
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login/`, credentials)
      .pipe(
        tap((response) => {
          this.storage.setAccessToken(response.access);
          this.storage.setRefreshToken(response.refresh);
          this.storage.setUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    const refreshToken = this.storage.getRefreshToken();

    if (refreshToken) {
      this.http
        .post(`${this.apiUrl}/auth/logout/`, { refresh: refreshToken })
        .subscribe({
          complete: () => this.clearAuthData(),
        });
    } else {
      this.clearAuthData();
    }
  }

  private clearAuthData(): void {
    this.storage.clearStorage();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile/`);
  }

  isLoggedIn(): boolean {
    return this.storage.isLoggedIn();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.storage.getRefreshToken();
    return this.http
      .post(`${this.apiUrl}/auth/token/refresh/`, {
        refresh: refreshToken,
      })
      .pipe(
        tap((response: any) => {
          this.storage.setAccessToken(response.access);
        })
      );
  }
}
