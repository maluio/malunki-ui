import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Card, Image} from '../model';
import {CardService} from '../card.service';

@Component({
    selector: 'app-create',
    templateUrl: './app.create.html'
})

export class AppCreate {
    public card = new Card();
    public image = new Image();

    constructor(
        public cardService: CardService,
        private router: Router
    ) {
    }

    createCard(): void {
        this.cardService.createCard(this.card);
        this.router.navigateByUrl('/list');
    }

    addImage(): void {
      if (this.image.url) {
        this.card.images.push(this.image);
        this.image = new Image();
      }
    }
}
