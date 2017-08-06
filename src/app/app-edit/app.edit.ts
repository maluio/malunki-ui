import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Card, Image} from '../model';
import {CardService} from '../card.service';

@Component({
    templateUrl: './app.edit.html',
    styles: ['.row-margin{ margin-bottom: 15px}']
})

export class AppEdit implements OnInit{

    card: Card = new Card;
    image: Image = new Image;
    preDelete: boolean = false;

    constructor(
        private cardService: CardService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        // (+) converts string 'id' to a number
        let id = +this.route.snapshot.params['id'];
        this.cardService.getCard(id)
            .then((card) => {
            this.card = card;
            });

    }

    updateCard(): void {
        this.cardService.updateCard(this.card);
        this.router.navigateByUrl("/list");
    }

    setPreDelete(val: boolean): void {
        this.preDelete = val;
    }

    deleteCard(): void {
        this.cardService.deleteCard(this.card);
        this.router.navigateByUrl("/list");
        this.preDelete = false;
    }

   learnNow():void{
      this.cardService.learnCard(this.card, 0);
      this.router.navigateByUrl("/list");
   }
/*
  addImage(): void {
    if (this.image.url) {
      this.card.images.push(this.image);
      this.image = new Image();
    }
  }

  removeImage(image: Image): void {
    this.card.images.splice(this.card.images.indexOf(image), 1);
  }*/

}
