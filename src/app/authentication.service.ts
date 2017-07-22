import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class AuthenticationService {

  private username: string = null;
  private password: string = null;

  constructor(
      private cookieService: CookieService
  ) {
    this.username = this.cookieService.get('username');
    this.password = this.cookieService.get('password');
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  authenticate(username: string, password: string): void {
    let oneYearFromNow = new Date (new Date().setFullYear(new Date().getFullYear() + 1));
    this.cookieService.put('username', username, {"expires": oneYearFromNow});
    this.cookieService.put('password', password, {"expires": oneYearFromNow});
    this.username = username;
    this.password = password;
  }

  isAuthenticated(): boolean {
    if (
      this.cookieService.get('username') == null ||
      this.cookieService.get('password') == null
    ) {
      return false
    }

    this.username = this.cookieService.get('username');
    this.password = this.cookieService.get('password');
    return true;
  }
}
