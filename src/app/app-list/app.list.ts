import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Card} from '../model';
import {CardService} from '../card.service';

@Component({
    selector: 'app-list',
    templateUrl: './app.list.html',
    styles: ['tbody tr { cursor: pointer}'],
})

export class AppList {

    constructor(
        public cardService: CardService,
        private router: Router
    ) {
    }

    onSelect(card: Card) {
        this.router.navigate(['/edit', card.id]);
    }
}
