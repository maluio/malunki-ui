import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Card} from '../card';
import {CardService} from '../card.service';

@Component({
    selector: 'app-create',
    templateUrl: './app.create.html'
})

export class AppCreate {
    public card = new Card();

    constructor(
        public cardService: CardService,
        private router: Router
    ) {
    }

    createCard(): void {
        this.cardService.createCard(this.card);
        this.router.navigateByUrl("/list");
    }

}
