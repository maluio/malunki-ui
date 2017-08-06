import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Card} from '../model';
import {CardService} from '../card.service';
import {Subscription} from "rxjs";

import {markerSeparator} from '../globals';

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
    word = '';

    constructor(
        private cardService: CardService,
        private router: Router
    ) {
        this.cardSubscription = cardService.cards.subscribe(
            cards => {
                cards = cards.sort((a, b) => a.reviewDate <= b.reviewDate ? -1 : 1);
                cards = cards.filter((card) => card.reviewDate < new Date());
                this.dueCard = cards[0];
                this.findWord();
            }
        );
    }

    learnCard(card: Card, nextReview: number): void {
        this.revealed = false;
        this.dueCard = null;
        setTimeout(() => this.cardService.learnCard(card, nextReview), 100);
    }

    reveal(){
        this.revealed = !this.revealed;
    }

    onSelect(card: Card) {
        this.router.navigate(['/edit', card.id]);
    }

    findWord() {
        if (!this.dueCard) {
            return;
        }

        this.word = '';
        const regEx = new RegExp('(' + markerSeparator + '.+' + markerSeparator + ')', 'g');
        const match = this.dueCard.front.match(regEx);
        if (match && match[0].length > 0) {
            this.word = match[0].split(markerSeparator).join('');
        }
    }

    onSolutionKey(event: any) {
        if (this.word === event.target.value) {
            this.revealed = true;
        } else {
            this.revealed = false;
        }
    }
}
