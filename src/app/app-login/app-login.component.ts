import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent implements OnInit{

  username: string;
  password: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
      if (this.authenticationService.isAuthenticated()){
        this.router.navigateByUrl("/");
      }
  }

  login():void {
      this.authenticationService.authenticate(this.username, this.password);
      this.router.navigateByUrl("/");
  }
}
