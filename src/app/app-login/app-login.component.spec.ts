import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

import { AppLoginComponent } from './app-login.component';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;

  beforeEach(async(() => {

    const authenticationServiceStub = {
      // authenticated : false,
      isAuthenticated : function () {
        return false;
      },
      authenticate : function () {}
    };

    const routerStub = {
      navigateByUrl : function () {}
    };


    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AppLoginComponent ],
      providers:    [ {
        provide: AuthenticationService, useValue: authenticationServiceStub
      }, {provide: Router, useValue: routerStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
