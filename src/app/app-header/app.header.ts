import {Component, OnInit} from '@angular/core';
import {CardService} from '../card.service';
import {Card} from '../model';
import {Subscription} from "rxjs";
import {ErrorService, Error} from "../error.service";

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
    ) {
        this.errorSubscription = errorService.errors.subscribe(
            errors => this.errors = errors
        );
    }

    ngOnInit(): void {
      this.cardService.loadCards();
    }

    filterDueCards(card: Card): boolean {
        return card.reviewDate < new Date();
    }

    reload():void{
      this.cardService.loadCards();
    }
}
