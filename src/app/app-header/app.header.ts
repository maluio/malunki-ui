import {Component, OnInit} from '@angular/core';
import {CardService} from '../card.service';
import {Card} from '../card';
import {Subscription} from "rxjs";
import {ErrorService, Error} from "../error.service";
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.header.html'
})
export class AppHeader implements OnInit {
    errorSubscription: Subscription;
    errors: Error[];
    constructor(
        public cardService: CardService,
        private errorService: ErrorService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.errorSubscription = errorService.errors.subscribe(
            errors => this.errors = errors
        );
    }

    ngOnInit(): void {
      if (this.authenticationService.isAuthenticated()){
         this.cardService.loadCards();
      }
      else {
        this.router.navigateByUrl("/login");
      }
    }

    filterDueCards(card: Card): boolean {
        return card.reviewDate < new Date();
    }

    reload():void{
      if (this.authenticationService.isAuthenticated()){
        this.cardService.loadCards();
      }
      else {
        this.router.navigateByUrl("/login");
      }
    }
}
