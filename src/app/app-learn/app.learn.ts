import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Card} from '../model';
import {CardService} from '../card.service';
import {Subscription} from 'rxjs';

import {Itemizer, Item} from '../util/itemizer';

import {trigger, state, animate, transition, style} from '@angular/animations';

@Component({
    selector: 'app-learn',
    templateUrl: './app.learn.html',
    styles: ['.row-margin{ margin-bottom: 15px}'],
    animations: [
      trigger('flyOut', [
        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
          style({transform: 'translateX(-100%)'}),
          animate(100)
        ]),
        transition('* => void', [
          animate(100, style({transform: 'translateX(100%)'}))
        ])
      ])
    ]
})

export class AppLearn {

    dueCard: Card = null;
    cardSubscription: Subscription;
    revealed: boolean = false;
    learnItems: Item[] = [];
    currentLearnItem: Item = null;

    constructor(
        private cardService: CardService,
        private router: Router,
        private itemizer: Itemizer
    ) {
        this.cardSubscription = cardService.cards.subscribe(
            cards => {
                cards = cards.sort((a, b) => a.reviewDate <= b.reviewDate ? -1 : 1);
                cards = cards.filter((card) => card.reviewDate < new Date());
                this.dueCard = cards[0];
                this.fillLearnItems();
            }
        );
    }

    learnCard(card: Card, nextReview: number): void {
        this.revealed = false;
        this.dueCard = null;
        setTimeout(() => this.cardService.learnCard(card, nextReview), 100);
    }

    reveal() {
        this.revealed = !this.revealed;
    }

    onSelect(card: Card) {
        this.router.navigate(['/edit', card.id]);
    }

    onSolutionKey(event: any) {
        if (this.dueCard.word === event.target.value) {
            this.revealed = true;
        } else {
            this.revealed = false;
        }
    }

    fillLearnItems() {
      if (!this.dueCard) {
        return;
      }

      this.learnItems = [];

      this.learnItems = this.itemizer.itemize(this.dueCard.front);

      this.dueCard.images.forEach(
        (img) => this.learnItems.push(
          new Item(
            'img',
            img.url
          )
        )
      );

      this.learnItems = this.shuffleArray(this.learnItems);
      this.getNextLearnItem();
    }

    getNextLearnItem() {
      const index = this.learnItems.indexOf(this.currentLearnItem);
      if (index + 1 === this.learnItems.length) {
        this.currentLearnItem = this.learnItems[0];
      } else {
        this.currentLearnItem = this.learnItems[index + 1];
      }
    }

  shuffleArray<T> (array: T[]): T[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
